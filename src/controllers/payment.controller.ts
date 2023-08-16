/* eslint-disable @typescript-eslint/naming-convention */
import boom from '@hapi/boom'
import mercadopago from 'mercadopago'
import crypto from 'crypto'
import { NextFunction, Request, Response } from 'express'
import { cinemaShowService, findOneUserById, paymentService, temporalReservationService, ticketService } from '../services'
import { asyncHandler } from '../middlewares'
import { Payload, settings } from '../config'
import { generateQR, getExpirationDate } from '../utils'
import { TEMPORAL_RESERVATION_STATUS } from '../enums'

// interface Item {
//   cinemaShowId: string
//   title: string
//   unitPrice: number
//   quantity: number
//   userId: number
// }

interface Payment {
  'data.id': string
  type: string
  [key: string]: string
}

const createOrder = asyncHandler(async ({ body, user }: Request, res: Response, next: NextFunction) => {
  const { items } = body
  const userPayload = user as Payload

  const elements = []

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

  const result = await mercadopago.preferences.create({
    items: elements,
    notification_url: `${settings.backendUrl}/api/v1/payments/webhook`,
    back_urls: {
      success: 'http://localhost:3000/api/v1/payments/success',
      pending: 'http://localhost:3000/api/v1/payments/pending',
      failure: 'http://localhost:3000/api/v1/payments/failure'
    },
    date_of_expiration: getExpirationDate(2)
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

      const ticketFound = await ticketService.findOne(temporalReservation.cinemaShow.id, user.id)

      const code = crypto.randomUUID()
      const qrCode = await generateQR(code)

      if (ticketFound) {
        await ticketService.update(ticketFound.id, {
          quantity: ticketFound.quantity + Number(item.quantityOfTickets)
        })
        const ticket = await ticketService.findOne(temporalReservation.cinemaShow.id, user.id)
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

  // TODO: VER CUANDO SE QUIERE COMPRAR MAS TICKETS PARA LA MISMA "CINEMA SHOW" - HACER EL ACTUALIZAR
  const status = 'ACCREDITED'

  if (status !== 'ACCREDITED') throw boom.badRequest()

  const user = await findOneUserById(userPayload.sub)

  if (!user) throw boom.conflict()

  const transformedItems = items.map((item: any) => {
    return {
      cinemaShowId: Number(item.cinemaShowId),
      quantityOfTickets: Number(item.quantity)
    }
  })

  const adaptedItems = []

  for await (const item of transformedItems) {
    const cinemaShow = await cinemaShowService.findOne({ id: item.cinemaShowId })

    if (!cinemaShow) throw boom.notFound('Cinema show not found')

    const currentTicketsAvailable = cinemaShow.capacityAvailable - item.quantityOfTickets

    if (currentTicketsAvailable <= 0) throw boom.badRequest(`There are not enough tickets available for '${cinemaShow.movie.title}'`)

    await cinemaShowService.update(cinemaShow.id, { capacityAvailable: currentTicketsAvailable })

    adaptedItems.push({ cinemaShow, quantityOfTickets: item.quantityOfTickets })
  }

  const tickets = []

  for await (const item of adaptedItems) {
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

const findAll = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  // const response = await paymentService.findAll(2)

  res.status(200).send({
    statusCode: res.statusCode,
    message: 'Payments  retrieved successfully'
    // response
  })
})

export const paymentController = {
  createOrder,
  createWithoutMercadoPago,
  receiveWebhook,
  findAll
}
