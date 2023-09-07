import boom from '@hapi/boom'
import { NextFunction, Response, Request } from 'express'
import { Payload } from '../config'

export function checkRoles (...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user
    const { rol } = user as Payload

    if (roles.includes(rol)) {
      next()
    } else {
      next(boom.unauthorized())
    }
  }
}
