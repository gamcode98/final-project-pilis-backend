import { Router, Application } from 'express'
import { authRouter, imageRouter, movieRouter, roomRouter } from '.'

export const routerApi = (app: Application) => {
  const router = Router()

  app.use('/api/v1', router)

  router.use('/auth', authRouter)
  router.use('/images', imageRouter)
  router.use('/movies', movieRouter)
  router.use('/rooms', roomRouter)
}
