import { Router } from 'express'
import passport from 'passport'
import { cinemaController } from '../controllers'
import { validatorHandler, checkRoles } from '../middlewares'
import { createCinemaShowSchema, getCinemaShowSchema } from '../schemas'
import { ROLES } from '../enums'

export const cinemaShowRouter = Router()

cinemaShowRouter.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(ROLES.ADMIN),
  validatorHandler(createCinemaShowSchema, 'body'),
  cinemaController.create
)

cinemaShowRouter.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(ROLES.ADMIN),
  cinemaController.findAll
)

cinemaShowRouter.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(ROLES.ADMIN),
  validatorHandler(getCinemaShowSchema, 'params'),
  cinemaController.findOne
)
