import passport from 'passport'
import { JwtStrategy } from './strategies/jwt.strategy'
import { LocalStrategy } from './strategies/local.strategy'

passport.use(LocalStrategy)
passport.use(JwtStrategy)
