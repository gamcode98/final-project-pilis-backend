import boom from '@hapi/boom'
import { NextFunction, Request, Response } from 'express'
import { asyncHandler } from '../middlewares'
import { roomService } from '../services'

const findAll = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const response = await roomService.findAll()

  res.status(200).send({
    statusCode: res.statusCode,
    message: 'Rooms retrieved successfully',
    response
  })
})

const findOne = asyncHandler(async ({ params }: Request, res: Response, next: NextFunction) => {
  const { id } = params

  const response = await roomService.findOne(+id)

  if (!response) throw boom.notFound('Room not found')

  res.status(200).send({
    statusCode: res.statusCode,
    message: 'Room retrieved successfully',
    response
  })
})

export const roomController = {
  findAll,
  findOne
}
