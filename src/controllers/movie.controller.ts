import boom from '@hapi/boom'
import { NextFunction, Request, Response } from 'express'
import { asyncHandler } from '../middlewares'
import { imageService, movieService } from '../services'
import { Payload } from '../config'
import { ROLES } from '../enums'
import { formatCinemaShows } from '../utils'

const create = asyncHandler(async ({ body }: Request, res: Response, next: NextFunction) => {
  const result = await imageService.findOne(body.imageId)

  if (!result) throw boom.notFound('Image not found')

  const response = await movieService.create({ ...body, image: result })

  res.status(201).send({
    statusCode: res.statusCode,
    message: 'Movie created successfully',
    response
  })
})

const findAll = asyncHandler(async ({ user }: Request, res: Response, next: NextFunction) => {
  if (user === undefined) {
    const response = await movieService.findAll(ROLES.CUSTOMER)

    res.status(200).send({
      statusCode: res.statusCode,
      message: 'Movies retrieved successfully',
      response
    })
  } else {
    const { rol } = user as Payload

    const response = await movieService.findAll(rol)

    res.status(200).send({
      statusCode: res.statusCode,
      message: 'Movies retrieved successfully',
      response
    })
  }
})

const findAllPrettyWay = asyncHandler(async ({ user }: Request, res: Response, next: NextFunction) => {
  if (user === undefined) {
    const movies = await movieService.findAll(ROLES.CUSTOMER)

    const response = movies.map(movie => {
      return {
        ...movie,
        cinemaShows: formatCinemaShows(movie.cinemaShows)
      }
    })

    res.status(200).send({
      statusCode: res.statusCode,
      message: 'Movies retrieved successfully',
      response
    })
  } else {
    const { rol } = user as Payload

    const movies = await movieService.findAll(rol)

    const response = movies.map(movie => {
      return {
        ...movie,
        cinemaShows: formatCinemaShows(movie.cinemaShows)
      }
    })

    res.status(200).send({
      statusCode: res.statusCode,
      message: 'Movies retrieved successfully',
      response
    })
  }
})

const findOne = asyncHandler(async ({ params }: Request, res: Response, next: NextFunction) => {
  const { id } = params

  const response = await movieService.findOne(+id)

  if (!response) throw boom.notFound('Movie not found')

  res.status(200).send({
    statusCode: res.statusCode,
    message: 'Movie retrieved successfully',
    response
  })
})

const update = asyncHandler(async ({ params, body }: Request, res: Response, next: NextFunction) => {
  const { id } = params

  const { title, duration, gender, director, description, trailerUrl, imageId } = body

  const image = await imageService.findOne(imageId)

  if (!image) throw boom.notFound('Image not found')

  const response = await movieService.update(+id, {
    title,
    duration,
    gender,
    director,
    description,
    trailerUrl,
    image
  })

  if (response.affected === 0) throw boom.badData('update failed')

  res.status(200).send({
    statusCode: res.statusCode,
    message: 'Movie updated successfully'
  })
})

const remove = asyncHandler(async ({ params }: Request, res: Response, next: NextFunction) => {
  const { id } = params
  const response = await movieService.remove(+id)

  res.status(200).send({
    statusCode: res.statusCode,
    message: 'Movie deleted successfully',
    response
  })
})

export const movieController = {
  create,
  findAll,
  findAllPrettyWay,
  findOne,
  update,
  remove
}
