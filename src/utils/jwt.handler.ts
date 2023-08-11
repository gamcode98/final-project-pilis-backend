import { Secret, sign, verify } from 'jsonwebtoken'
import { settings } from '../config'

export const generateToken = (payload: {}, time: string = '2h') => {
  const jwt = sign(payload, settings.jwtSecret as Secret, {
    expiresIn: time
  })

  return jwt
}

export const verifyToken = (jwt: string) => {
  const isOk = verify(jwt, settings.jwtSecret as Secret)
  return isOk
}
