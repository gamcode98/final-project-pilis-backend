import boom from '@hapi/boom'
import { NextFunction, Request, Response } from 'express'
import { asyncHandler } from '../middlewares'
import { imageService, movieService } from '../services'

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

const findAll = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const response = await movieService.findAll()

  res.status(200).send({
    statusCode: res.statusCode,
    message: 'Movies retrieved successfully',
    response
  })
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

export const movieController = {
  create,
  findAll,
  findOne
}
