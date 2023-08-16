import { Router } from 'express'
import passport from 'passport'
import { paymentController } from '../controllers'
import { ROLES } from '../enums'
import { checkRoles, validatorHandler } from '../middlewares'
import { createPaymentSchema } from '../schemas'

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

paymentRouter.get('/', paymentController.findAll)

paymentRouter.get('/success', (req, res) => res.send('Success'))

paymentRouter.get('/failure', (req, res) => res.send('Failure'))

paymentRouter.get('/pending', (req, res) => res.send('Pending'))
