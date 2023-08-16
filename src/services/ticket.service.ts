import { TicketDto, UpdateTicketDto } from '../dtos'
import { Ticket } from '../entities'

const create = async (data: TicketDto) => {
  const { qrCode, cinemaShow, quantity, code, user } = data

  const ticket = new Ticket()

  ticket.qrCode = qrCode
  ticket.cinemaShow = cinemaShow
  ticket.quantity = quantity
  ticket.code = code
  ticket.user = user

  const result = await ticket.save()

  return result
}

const update = async (id: number, data: UpdateTicketDto) => {
  const result = await Ticket.update(id, data)
  return result
}

const findOne = async (cinemaShowId: number, userId: number) => {
  const result = await Ticket.findOne({
    where: { cinemaShow: { id: cinemaShowId }, user: { id: userId } },
    relations: ['cinemaShow']
  })
  return result
}

export const ticketService = {
  create,
  update,
  findOne
}
