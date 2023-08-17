import { Router } from 'express'
import passport from 'passport'
import { ticketController } from '../controllers'
import { checkRoles } from '../middlewares'
import { ROLES } from '../enums'

export const ticketRouter = Router()

ticketRouter.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(ROLES.CUSTOMER),
  ticketController.findAll
)
