import { Router, Application } from 'express'
import {
  authRouter,
  cinemaShowRouter,
  imageRouter,
  movieRouter,
  paymentRouter,
  roomRouter,
  ticketRouter
} from '.'

export const routerApi = (app: Application) => {
  const router = Router()

  app.use('/api/v1', router)

  router.use('/auth', authRouter)
  router.use('/images', imageRouter)
  router.use('/movies', movieRouter)
  router.use('/rooms', roomRouter)
  router.use('/cinema-shows', cinemaShowRouter)
  router.use('/payments', paymentRouter)
  router.use('/tickets', ticketRouter)
}
