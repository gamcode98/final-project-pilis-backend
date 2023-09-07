import { Strategy, ExtractJwt } from 'passport-jwt'
import { settings } from '../../../config'

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: settings.jwtSecret
}

export const JwtStrategy = new Strategy(options, (payload, done) => {
  return done(null, payload)
})
