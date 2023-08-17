import { Router } from 'express'
import passport from 'passport'
import { movieController } from '../controllers'
import { validatorHandler, checkRoles } from '../middlewares'
import { createMovieSchema, getMovieSchema } from '../schemas'
import { ROLES } from '../enums'

export const movieRouter = Router()

movieRouter.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(ROLES.ADMIN),
  validatorHandler(createMovieSchema, 'body'),
  movieController.create
)

movieRouter.get(
  '/',
  movieController.findAll
)

movieRouter.get(
  '/without-cinema-shows',
  passport.authenticate('jwt', { session: false }),
  checkRoles(ROLES.ADMIN),
  movieController.findAll
)

movieRouter.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(ROLES.ADMIN),
  validatorHandler(getMovieSchema, 'params'),
  movieController.findOne
)
