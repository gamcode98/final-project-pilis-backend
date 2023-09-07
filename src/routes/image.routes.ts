import passport from 'passport'
import { Router } from 'express'
import { imageController } from '../controllers'
import { upload, checkRoles } from '../middlewares'
import { ROLES } from '../enums'

export const imageRouter = Router()

imageRouter.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(ROLES.ADMIN),
  imageController.findAll)

imageRouter.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(ROLES.ADMIN),
  upload.single('image'),
  imageController.create)

imageRouter.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(ROLES.ADMIN),
  upload.single('image'),
  imageController.update)
