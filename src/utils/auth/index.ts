import passport from 'passport'
import { JwtStrategy } from './strategies/jwt.strategy'

// const LocalStrategy = require("./strategies/local.strategy");

// passport.use(LocalStrategy)
passport.use(JwtStrategy)
