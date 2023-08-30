import { NextFunction, Request, Response } from 'express'
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

export const ticketController = {
  findAll
}
