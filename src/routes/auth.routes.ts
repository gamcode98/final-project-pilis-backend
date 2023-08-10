import { Router } from 'express'
import passport from 'passport'
import { login, signup } from '../controllers'
import { validatorHandler } from '../middlewares'
import { signupUserSchema } from '../schemas'

export const authRouter = Router()

authRouter.post('/signup', validatorHandler(signupUserSchema, 'body'), signup)

authRouter.post('/login', passport.authenticate('local', { session: false }), login)
