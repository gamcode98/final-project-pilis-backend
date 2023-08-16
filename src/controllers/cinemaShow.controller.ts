import boom from '@hapi/boom'
import { NextFunction, Request, Response } from 'express'
import { asyncHandler } from '../middlewares'
import { cinemaShowService, movieService, roomService } from '../services'
import { MINUTES } from '../enums'

const create = asyncHandler(async ({ body }: Request, res: Response, next: NextFunction) => {
  const { roomId, movieId, date, hour, minutes } = body

  const cinemaShow = await cinemaShowService.findOne({ room: { id: +roomId } })

  if (cinemaShow) {
    if (cinemaShow.date === date && cinemaShow.hour === hour && cinemaShow.minutes === minutes) {
      throw boom.conflict('Cinema show already exists')
    }

    const timeDifferenceMinutes = (hour - cinemaShow.hour) * MINUTES.ONE_HOUR + (minutes - cinemaShow.minutes)

    if (timeDifferenceMinutes < MINUTES.THREE_HOURS) {
      throw boom.conflict('The difference between functions must be at least 3 hours.')
    }
  }

  const room = await roomService.findOne(roomId)

  const movie = await movieService.findOne(movieId)

  const response = await cinemaShowService.create({ ...body, room, movie })

  res.status(201).send({
    statusCode: res.statusCode,
    message: 'Cinema show created successfully',
    response
  })
})

const findAll = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const response = await cinemaShowService.findAll()

  res.status(200).send({
    statusCode: res.statusCode,
    message: 'Cinema shows retrieved successfully',
    response
  })
})

const findOne = asyncHandler(async ({ params }: Request, res: Response, next: NextFunction) => {
  const { id } = params

  const response = await cinemaShowService.findOne({ id: Number(id) })

  if (!response) throw boom.notFound('Cinema show not found')

  res.status(200).send({
    statusCode: res.statusCode,
    message: 'Cinema show retrieved successfully',
    response
  })
})

export const cinemaController = {
  create,
  findAll,
  findOne
}
