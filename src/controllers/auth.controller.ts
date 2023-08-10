import { NextFunction, Request, Response } from 'express'
import boom from '@hapi/boom'
import { asyncHandler } from '../middlewares'
import { createUser, findOneUserByEmail, findOneRole } from '../services'
import { encryptPassword } from '../utils/bcrypt.handler'
import { ROLES } from '../enums'
import { RequestExt } from '../config/request-ext'
import { generateToken } from '../utils/jwt.handler'

export const signup = asyncHandler(async ({ body }: Request, res: Response, next: NextFunction) => {
  const { email, password } = body

  const hasAccount = await findOneUserByEmail(email)

  if (hasAccount) throw boom.forbidden('Email already in use')

  const passwordHash = await encryptPassword(password)

  const role = await findOneRole(ROLES.CUSTOMER)

  if (!role) throw boom.notFound('Role not found')

  await createUser({ email, password: passwordHash, role })

  res.status(201).send({
    statusCode: res.statusCode,
    message: 'User created successfully'
  })
})

export const login = asyncHandler(async ({ user }: RequestExt, res: Response, next: NextFunction) => {
  const payload = { id: user.id }
  const token = generateToken(payload)

  res.status(200).send({
    statusCode: res.statusCode,
    message: 'User logged in successfully',
    user,
    token
  })
})
