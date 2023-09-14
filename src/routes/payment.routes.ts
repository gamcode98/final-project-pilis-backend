import { Router } from 'express'
import passport from 'passport'
import { paymentController } from '../controllers'
import { checkRoles, validatorHandler } from '../middlewares'
import { createPaymentSchema } from '../schemas'
import { ROLES } from '../enums'

export const paymentRouter = Router()

paymentRouter.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(ROLES.CUSTOMER),
  validatorHandler(createPaymentSchema, 'body'),
  paymentController.createWithoutMercadoPago
)

paymentRouter.post(
  '/create-order',
  passport.authenticate('jwt', { session: false }),
  checkRoles(ROLES.CUSTOMER),
  validatorHandler(createPaymentSchema, 'body'),
  paymentController.createOrder
)

paymentRouter.post('/webhook', paymentController.receiveWebhook)

paymentRouter.get('/success', paymentController.renderSuccess)

paymentRouter.get('/failure', paymentController.renderFailure)

paymentRouter.get('/pending', paymentController.renderPending)
