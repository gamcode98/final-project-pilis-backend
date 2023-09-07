import { Router } from 'express'
import passport from 'passport'
import { ticketController } from '../controllers'
import { checkRoles, validatorHandler } from '../middlewares'
import { ROLES } from '../enums'
import { updateTicketSchema } from '../schemas'

export const ticketRouter = Router()

ticketRouter.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(ROLES.CUSTOMER),
  ticketController.findAll
)

ticketRouter.patch(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(ROLES.ADMIN),
  validatorHandler(updateTicketSchema, 'body'),
  ticketController.update
)
