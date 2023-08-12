import Joi from 'joi'

const id = Joi.number().integer()
const date = Joi.date()
const hour = Joi.number().integer().positive().min(9).max(22)
const minutes = Joi.number().integer().min(0).max(59)
const price = Joi.number().positive()
const roomId = Joi.number().integer().positive()
const movieId = Joi.number().integer().positive()

const createCinemaShowSchema = Joi.object({
  date: date.required(),
  hour: hour.required(),
  minutes: minutes.required(),
  price: price.required(),
  roomId: roomId.required(),
  movieId: movieId.required()
})

const getCinemaShowSchema = Joi.object({
  id: id.required()
})

export {
  createCinemaShowSchema,
  getCinemaShowSchema
}
