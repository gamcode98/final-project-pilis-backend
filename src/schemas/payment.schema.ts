import Joi from 'joi'

const id = Joi.number().integer()
const cinemaShowId = Joi.number().integer().positive()
const title = Joi.string().min(3).max(255)
const unitPrice = Joi.number().integer().positive()
const quantity = Joi.number().integer().positive()

const item = Joi.object({
  cinemaShowId: cinemaShowId.required(),
  title: title.required(),
  unitPrice: unitPrice.required(),
  quantity: quantity.required()
})

const items = Joi.array().items(item).min(1)

const createPaymentSchema = Joi.object({
  items: items.required()
})

const getPaymentSchema = Joi.object({
  id: id.required()
})

export {
  createPaymentSchema,
  getPaymentSchema
}
