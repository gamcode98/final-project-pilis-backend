import { PaymentDto } from '../dtos'
import { Payment } from '../entities'

const create = async (data: PaymentDto) => {
  const { paymentMethod, transactionAmount, ticket } = data

  const payment = new Payment()

  payment.paymentMethod = paymentMethod
  payment.transactionAmount = transactionAmount
  payment.ticket = ticket

  const result = await payment.save()
  return result
}

export const paymentService = {
  create
}
