import boom from '@hapi/boom'
import Joi from 'joi'
import { NextFunction, Request, Response } from 'express'

export function validatorHandler (schema: Joi.ObjectSchema<any>, property: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req[property as keyof Request]

    const { error } = schema.validate(data, { abortEarly: false })

    if (error) return next(boom.badRequest(error))

    next()
  }
}
