import { Router } from 'express'
import { imageController } from '../controllers'
import { upload } from '../middlewares'

export const imageRouter = Router()

imageRouter.post(
  '/',
  upload.single('image'),
  imageController.create)
