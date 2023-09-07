import Joi from 'joi'

const id = Joi.number().integer()
const username = Joi.string().min(3).max(10)
const email = Joi.string().email()
const password = Joi.string()
  .min(8)
  .max(16)
  .pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/)
  .message(
    '"password" must be a string with minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character'
  )

const signupUserSchema = Joi.object({
  username: username.required(),
  email: email.required(),
  password: password.required()
})

const loginUserSchema = Joi.object({
  email: email.required(),
  password: password.required()
})

const updateUserSchema = Joi.object({
  email
})

const getUserSchema = Joi.object({
  id: id.required()
})

export {
  signupUserSchema,
  loginUserSchema,
  updateUserSchema,
  getUserSchema
}
