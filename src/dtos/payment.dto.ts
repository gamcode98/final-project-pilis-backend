import { BaseDto } from '.'
import { Ticket } from '../entities'

export interface PaymentDto extends BaseDto {
  transactionAmount: number
  paymentMethod: string
  ticket: Ticket
}
