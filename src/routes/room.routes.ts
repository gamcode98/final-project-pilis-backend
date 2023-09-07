import { Router } from 'express'
import passport from 'passport'
import { roomController } from '../controllers'
import { checkRoles, validatorHandler } from '../middlewares'
import { getRoomSchema } from '../schemas/room.schema'
import { ROLES } from '../enums'

export const roomRouter = Router()

roomRouter.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(ROLES.ADMIN),
  roomController.findAll
)

roomRouter.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(ROLES.ADMIN),
  validatorHandler(getRoomSchema, 'params'),
  roomController.findOne
)
