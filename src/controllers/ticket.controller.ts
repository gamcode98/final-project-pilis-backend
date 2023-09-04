import { NextFunction, Request, Response } from 'express'
import boom from '@hapi/boom'
import { asyncHandler } from '../middlewares'
import { ticketService } from '../services'
import { Payload } from '../config'
import { groupTicketsByMovieTitle } from '../utils'

const findAll = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const userPayload = req.user as Payload

  await ticketService.updateState(userPayload.sub)

  const tickets = await ticketService.findAll(userPayload.sub)

  const ticketsFormatted = groupTicketsByMovieTitle(tickets)

  res.status(200).send({
    statusCode: res.statusCode,
    message: 'Tickets retrieved successfully',
    response: ticketsFormatted
  })
})

const update = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { code } = req.body

  const ticket = await ticketService.findOne({ code })

  if (!ticket) throw boom.notFound('Ticket not found')

  if (!ticket.isWorking) throw boom.conflict('Ticket already used')

  await ticketService.update(ticket.id, { isWorking: false })

  res.status(200).send({
    statusCode: res.statusCode,
    message: 'Ticket marked as used'
  })
})

export const ticketController = {
  findAll,
  update
}
