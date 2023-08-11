import { Strategy } from 'passport-local'
import boom from '@hapi/boom'
import { findOneUserByEmail } from '../../../services'
import { verifyPassword } from '../../bcrypt.handler'

export const LocalStrategy = new Strategy(
  {
    usernameField: 'email'
  },
  async (email, password, done) => {
    try {
      const user = await findOneUserByEmail(email)

      if (!user) {
        done(boom.unauthorized(), false)
      } else {
        const isMatch = await verifyPassword(password, user.password)

        if (!isMatch) done(boom.unauthorized(), false)

        const userWithoutPassword = {
          id: user.id,
          email: user.email,
          role: user.rol,
          createadAt: user.createdAt,
          updatedAt: user.updatedAt
        }

        done(null, userWithoutPassword)
      }
    } catch (error) {
      done(error, false)
    }
  }
)
