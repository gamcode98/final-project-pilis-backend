import { Strategy } from 'passport-local'
import boom from '@hapi/boom'
import bcrypt from 'bcrypt'

// const UserService = require('./../../../services/user.service')

// const service = new UserService()

// const LocalStrategy = new Strategy(
//   {
//     usernameField: 'email'
//   },
//   async (email, password, done) => {
//     try {
//       const user = await service.findByEmail(email)
//       if (!user) {
//         done(boom.unauthorized(), false)
//       }
//       const isMatch = await bcrypt.compare(password, user.password)
//       if (!isMatch) {
//         done(boom.unauthorized(), false)
//       }
//       delete user.dataValues.password
//       done(null, user)
//     } catch (error) {
//       done(error, false)
//     }
//   }
// )

// module.exports = LocalStrategy
