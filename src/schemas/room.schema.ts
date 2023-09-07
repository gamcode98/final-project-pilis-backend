import Joi from 'joi'

const id = Joi.number().integer()

const getRoomSchema = Joi.object({
  id: id.required()
})

export {
  getRoomSchema
}
