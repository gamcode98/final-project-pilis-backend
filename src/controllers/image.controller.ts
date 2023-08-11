import boom from '@hapi/boom'
import { NextFunction, Request, Response } from 'express'
import { uploadToCloudinary } from '../utils'
import { asyncHandler } from '../middlewares'
import { imageService } from '../services'

const create = asyncHandler(async ({ file }: Request, res: Response, next: NextFunction) => {
  if (!file) throw boom.badRequest()

  const result = await uploadToCloudinary(file.buffer)

  if (!result) throw boom.badRequest('Something went wrong')

  const response = await imageService.create({ url: result.secure_url })

  if (!response) throw boom.badRequest('Something went wrong')

  res.status(201).send({
    statusCode: res.statusCode,
    message: 'Image uploaded successfully',
    response
  })
})

export const imageController = {
  create
}
