import Joi from 'joi'
import { GENDERS } from '../enums'

const id = Joi.number().integer()
const title = Joi.string().min(3).max(50)
const duration = Joi.string().min(5).max(5)
const gender = Joi.string().valid(GENDERS.ACTION, GENDERS.COMEDY, GENDERS.DOCUMENTARY, GENDERS.DRAMA, GENDERS.HORROR, GENDERS.ROMANCE, GENDERS.THRILLER)
const director = Joi.string().min(3).max(50)
const description = Joi.string().min(3).max(200)
const trailerUrl = Joi.string().uri()
const imageId = Joi.number().integer()

const createMovieSchema = Joi.object({
  title: title.required(),
  duration: duration.required(),
  gender: gender.required(),
  director: director.required(),
  description: description.required(),
  trailerUrl: trailerUrl.required(),
  imageId: imageId.required()
})

const getMovieSchema = Joi.object({
  id: id.required()
})

export {
  createMovieSchema,
  getMovieSchema
}
