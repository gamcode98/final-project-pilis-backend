import { NextFunction, Request, Response } from 'express'
import { asyncHandler } from '../middlewares'
import { ticketService } from '../services'
import { Payload } from '../config'

const findAll = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const userPayload = req.user as Payload

  await ticketService.updateState(userPayload.sub)

  const response = await ticketService.findAll(userPayload.sub)

  res.status(200).send({
    statusCode: res.statusCode,
    message: 'Tickets retrieved successfully',
    response
  })
})

export const ticketController = {
  findAll
}
