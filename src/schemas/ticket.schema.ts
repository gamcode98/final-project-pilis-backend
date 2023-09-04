import Joi from 'joi'

const code = Joi.string()

const updateTicketSchema = Joi.object({
  code: code.required()
})

export {
  updateTicketSchema
}
