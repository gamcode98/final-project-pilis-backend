import { Router, Application } from 'express'
import { authRouter } from '.'

export const routerApi = (app: Application) => {
  const router = Router()

  app.use('/api/v1', router)

  router.use('/auth', authRouter)
}
