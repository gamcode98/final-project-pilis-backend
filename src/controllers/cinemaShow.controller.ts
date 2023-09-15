import boom from '@hapi/boom'
import { NextFunction, Request, Response } from 'express'
import { asyncHandler } from '../middlewares'
import { cinemaShowService, movieService, roomService } from '../services'

const create = asyncHandler(async ({ body }: Request, res: Response, next: NextFunction) => {
  const { roomId, movieId, date, hour, minutes } = body

  const cinemaShows = await cinemaShowService.findByRoom(roomId)

  const foundCinemaShow = cinemaShows.find(cinemaShow => {
    return cinemaShow.date === date && cinemaShow.hour === hour && cinemaShow.minutes === minutes
  })

  if (foundCinemaShow) throw boom.conflict('Cinema show already exists')

  const cinemaShowsByDate = cinemaShows.filter(cinemaShow => {
    return cinemaShow.date === date
  })

  for (const cinemaShow of cinemaShowsByDate) {
    const timeFromFoundCinemaShow = cinemaShow.hour * 60 + cinemaShow.minutes
    const timeFromNewCinemaShow = Number(hour) * 60 + Number(minutes)
    const differenceInMinutes = timeFromNewCinemaShow - timeFromFoundCinemaShow

    if (differenceInMinutes < 0) {
      if ((differenceInMinutes * -1) < 180) {
        throw boom.conflict('The difference between functions must be at least 3 hours.')
      }
    } else {
      if (differenceInMinutes < 180) {
        throw boom.conflict('The difference between functions must be at least 3 hours.')
      }
    }
  }

  const room = await roomService.findOne(roomId)

  if (!room) throw boom.notFound('Room not found')

  const movie = await movieService.findOne(movieId)

  if (!movie) throw boom.notFound('Movie not found')

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

const update = asyncHandler(async ({ params, body }: Request, res: Response, next: NextFunction) => {
  const { id } = params

  const { date, hour, minutes, price, roomId, movieId } = body

  const cinemaShows = await cinemaShowService.findByRoom(roomId)

  const foundCinemaShow = cinemaShows.find(cinemaShow => {
    return cinemaShow.date === date && cinemaShow.hour === hour && cinemaShow.minutes === minutes && cinemaShow.id !== +id
  })

  if (foundCinemaShow) throw boom.conflict('Cinema show already exists')

  const cinemaShowsByDate = cinemaShows.filter(cinemaShow => {
    return cinemaShow.date === date && cinemaShow.id !== +id
  })

  for (const cinemaShow of cinemaShowsByDate) {
    const timeFromFoundCinemaShow = cinemaShow.hour * 60 + cinemaShow.minutes
    const timeFromNewCinemaShow = Number(hour) * 60 + Number(minutes)
    const differenceInMinutes = timeFromNewCinemaShow - timeFromFoundCinemaShow

    if (differenceInMinutes < 0) {
      if ((differenceInMinutes * -1) < 180) {
        throw boom.conflict('The difference between functions must be at least 3 hours.')
      }
    } else {
      if (differenceInMinutes < 180) {
        throw boom.conflict('The difference between functions must be at least 3 hours.')
      }
    }
  }

  const room = await roomService.findOne(roomId)

  if (!room) throw boom.notFound('Room not found')

  const movie = await movieService.findOne(movieId)

  if (!movie) throw boom.notFound('Movie not found')

  const response = await cinemaShowService.update(+id, { date, hour, minutes, price, room, movie })

  res.status(201).send({
    statusCode: res.statusCode,
    message: 'Cinema show updated successfully',
    response
  })
})

const remove = asyncHandler(async ({ params }: Request, res: Response, next: NextFunction) => {
  const { id } = params

  const cinemaShow = await cinemaShowService.findOne({ id: +id })

  if (!cinemaShow) throw boom.notFound('Cinema show not found')

  if (cinemaShow.tickets.length > 0) throw boom.conflict('Cinema show has tickets')

  const response = await cinemaShowService.remove(+id)

  res.status(200).send({
    statusCode: res.statusCode,
    message: 'Cinema show deleted successfully',
    response
  })
})

export const cinemaController = {
  create,
  findAll,
  findOne,
  update,
  remove
}
