import boom from '@hapi/boom'
import { NextFunction, Request, Response } from 'express'
import { createUser, findOneUserByEmail, findOneRole } from '../services'
import { asyncHandler } from '../middlewares'
import { RequestExt } from '../config'
import { encryptPassword, generateToken } from '../utils'
import { ROLES } from '../enums'

export const signup = asyncHandler(async ({ body }: Request, res: Response, next: NextFunction) => {
  const { username, email, password } = body

  const hasAccount = await findOneUserByEmail(email)

  if (hasAccount) throw boom.forbidden('Email already in use')

  const passwordHash = await encryptPassword(password)

  const role = await findOneRole(ROLES.CUSTOMER)

  if (!role) throw boom.notFound('Role not found')

  await createUser({ username, email, password: passwordHash, role })

  res.status(201).send({
    statusCode: res.statusCode,
    message: 'User created successfully'
  })
})

export const login = asyncHandler(async ({ user }: RequestExt, res: Response, next: NextFunction) => {
  const payload = { sub: user.id, rol: user.role.name }
  const token = generateToken(payload)

  res.status(200).send({
    statusCode: res.statusCode,
    message: 'User logged in successfully',
    user,
    token
  })
})
