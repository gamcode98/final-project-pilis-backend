/* eslint-disable @typescript-eslint/naming-convention */
import boom from '@hapi/boom'
import mercadopago from 'mercadopago'
import crypto from 'crypto'
import cron from 'node-cron'
import { NextFunction, Request, Response } from 'express'
import { asyncHandler } from '../middlewares'
import { generateQR, getExpirationDate } from '../utils'
import { EXPIRATION_MINUTES, TEMPORAL_RESERVATION_STATUS } from '../enums'
import { Payload, settings } from '../config'
import {
  cinemaShowService,
  findOneUserById,
  paymentService,
  temporalReservationService,
  ticketService
} from '../services'

interface Payment {
  'data.id': string
  type: string
  [key: string]: string
}

const createOrder = asyncHandler(async ({ body, user }: Request, res: Response, next: NextFunction) => {
  const { items } = body
  const userPayload = user as Payload

  const elements: any = []

  for await (const item of items) {
    const cinemaShow = await cinemaShowService.findOne({ id: item.cinemaShowId })

    if (!cinemaShow) throw boom.notFound('Cinema show not found')

    const currentCapacityAvailable = cinemaShow.capacityAvailable - item.quantity

    if (currentCapacityAvailable <= 0) {
      throw boom.badRequest(`There are not enough tickets available for '${item.title}'`)
    }

    await cinemaShowService.update(cinemaShow.id, { capacityAvailable: currentCapacityAvailable })

    const temporalReservation = await temporalReservationService.create({ cinemaShow, quantity: item.quantity })

    const element = {
      ...item,
      unit_price: item.unitPrice,
      category_id: temporalReservation.id.toString(),
      id: userPayload.sub
    }

    elements.push(element)
  }

  if (!settings.mercadopagoApiKey) throw boom.forbidden()

  mercadopago.configure({
    access_token: settings.mercadopagoApiKey
  })

  const { expirationDate, minute, hour, dayOfMonth, month, dayOfWeek } = getExpirationDate(EXPIRATION_MINUTES.ONE)

  const result = await mercadopago.preferences.create({
    items: elements,
    notification_url: `${settings.backendUrl}/api/v1/payments/webhook`,
    back_urls: {
      success: `${settings.backendUrl}/api/v1/payments/success`,
      pending: `${settings.backendUrl}/api/v1/payments/pending`,
      failure: `${settings.backendUrl}/api/v1/payments/failure`
    },
    date_of_expiration: expirationDate
  })

  cron.schedule(`${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`, async () => {
    for await (const element of elements) {
      const temporalReservation = await temporalReservationService.findOne(Number(element.category_id))

      if (!temporalReservation) throw boom.notFound()

      if (temporalReservation.status === TEMPORAL_RESERVATION_STATUS.PENDING) {
        const currentCapacityAvailable = temporalReservation.cinemaShow.capacityAvailable + Number(element.quantity)

        await cinemaShowService.update(temporalReservation.cinemaShow.id, { capacityAvailable: currentCapacityAvailable })

        await temporalReservationService.update(temporalReservation.id, { status: TEMPORAL_RESERVATION_STATUS.CANCELED })
      }
    }
  })

  res.status(201).send({
    statusCode: res.statusCode,
    message: 'Order created successfully',
    data: result.body.init_point
  })
})

const receiveWebhook = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const payment = req.query

  if (payment.type === 'payment') {
    const paymentDone = payment as Payment

    const { body } = await mercadopago.payment.findById(+paymentDone['data.id'])

    if (body.status_detail !== 'accredited') throw boom.badData()

    const user = await findOneUserById(Number(body.additional_info.items[0].id))

    if (!user) throw boom.conflict()

    const items = body.additional_info.items.map((item: any) => {
      return {
        temporalReservationId: Number(item.category_id),
        quantityOfTickets: Number(item.quantity)
      }
    })

    const tickets = []

    for await (const item of items) {
      await temporalReservationService.update(
        item.temporalReservationId, {
          status: TEMPORAL_RESERVATION_STATUS.CONFIRMED
        })

      const temporalReservation = await temporalReservationService.findOne(item.temporalReservationId)

      if (!temporalReservation) throw boom.notFound()

      const ticketFound = await ticketService.findOne({
        cinemaShow: { id: temporalReservation.cinemaShow.id },
        user: { id: user.id }
      })

      const code = crypto.randomUUID()
      const qrCode = await generateQR(code)

      if (ticketFound) {
        await ticketService.update(ticketFound.id, {
          quantity: ticketFound.quantity + Number(item.quantityOfTickets)
        })

        const ticket = await ticketService.findOne({
          cinemaShow: { id: temporalReservation.cinemaShow.id },
          user: { id: user.id }
        })

        if (!ticket) throw boom.notFound()

        tickets.push(ticket)
      } else {
        const ticket = await ticketService.create({
          user,
          code,
          qrCode,
          cinemaShow: temporalReservation.cinemaShow,
          quantity: item.quantityOfTickets
        })

        tickets.push(ticket)
      }
    }

    for await (const ticket of tickets) {
      await paymentService.create({
        paymentMethod: body.payment_method_id,
        transactionAmount: ticket.cinemaShow.price * ticket.quantity,
        ticket
      })
    }

    res.sendStatus(204)
  }
})

const createWithoutMercadoPago = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const userPayload = req.user as Payload
  const { items } = req.body

  const user = await findOneUserById(userPayload.sub)

  if (!user) throw boom.notFound()

  const transformedItems = items.map((item: any) => {
    return {
      cinemaShowId: item.cinemaShowId,
      quantityOfTickets: item.quantity
    }
  })

  const adaptedItems = []

  for await (const item of transformedItems) {
    const cinemaShow = await cinemaShowService.findOne({ id: item.cinemaShowId })

    if (!cinemaShow) throw boom.notFound('Cinema show not found')

    const currentCapacityAvailable = cinemaShow.capacityAvailable - item.quantityOfTickets

    if (currentCapacityAvailable <= 0) {
      throw boom.badRequest(`There are not enough tickets available for '${cinemaShow.movie.title}'`)
    }

    adaptedItems.push({ cinemaShow, quantityOfTickets: item.quantityOfTickets, currentCapacityAvailable })
  }

  const tickets = []

  for await (const item of adaptedItems) {
    const ticketFound = await ticketService.findOne({
      cinemaShow: { id: item.cinemaShow.id },
      user: { id: user.id }
    })

    await cinemaShowService.update(item.cinemaShow.id, { capacityAvailable: item.currentCapacityAvailable })

    if (ticketFound) {
      await ticketService.update(ticketFound.id, {
        quantity: ticketFound.quantity + Number(item.quantityOfTickets)
      })

      const ticket = await ticketService.findOne({
        cinemaShow: { id: item.cinemaShow.id },
        user: { id: user.id }
      })

      if (!ticket) throw boom.notFound()

      tickets.push(ticket)
    } else {
      const code = crypto.randomUUID()
      const qrCode = await generateQR(code)

      const ticket = await ticketService.create({
        user,
        code,
        qrCode,
        cinemaShow: item.cinemaShow,
        quantity: item.quantityOfTickets
      })
      tickets.push(ticket)
    }
  }

  const localPayments = []

  for await (const ticket of tickets) {
    const localPayment = await paymentService.create({
      paymentMethod: 'account_money',
      transactionAmount: ticket.cinemaShow.price * ticket.quantity,
      ticket
    })
    localPayments.push(localPayment)
  }

  res.status(201).send({
    statusCode: res.statusCode,
    message: 'Payments created successfully',
    response: localPayments
  })
})

const renderSuccess = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.render('success', { frontendUrl: settings.frontendUrl, mobileUrl: settings.mobileUrl })
})

const renderFailure = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.render('failure', { frontendUrl: settings.frontendUrl, mobileUrl: settings.mobileUrl })
})

const renderPending = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.render('pending', { frontendUrl: settings.frontendUrl, mobileUrl: settings.mobileUrl })
})

export const paymentController = {
  createOrder,
  createWithoutMercadoPago,
  receiveWebhook,
  renderSuccess,
  renderFailure,
  renderPending
}
