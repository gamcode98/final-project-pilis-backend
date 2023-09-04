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

const update = async (id: number, updateTicketDto: UpdateTicketDto) => {
  const result = await Ticket.update(id, updateTicketDto)
  return result
}

const updateState = async (userId: number) => {
  const currentDate = new Date()
  const allowableHours = 1

  const ticketsToUpdate = await Ticket
    .createQueryBuilder('ticket')
    .leftJoinAndSelect('ticket.cinemaShow', 'cinemashow')
    .where('ticket.user_id = :userId', { userId })
    .andWhere('cinemashow.date <= :currentDate', { currentDate })
    .andWhere('cinemashow.hour <= :currentHour', { currentHour: currentDate.getHours() - allowableHours })
    .andWhere('cinemashow.minutes <= :currentMinutes', { currentMinutes: currentDate.getMinutes() })
    .andWhere('ticket.is_working = :isWorking', { isWorking: true })
    .getMany()

  for (const ticket of ticketsToUpdate) {
    ticket.isWorking = false
  }

  const result = await Ticket.save(ticketsToUpdate)
  return result
}

const findOne = async (term: { cinemaShow: { id: number }, user: { id: number } } | { id: number } | { code: string }) => {
  const result = await Ticket.findOne({
    where: term,
    relations: ['cinemaShow']
  })

  return result
}

const findAll = async (userId: number) => {
  const result = await Ticket.find({
    where: { user: { id: userId }, isWorking: true },
    relations: ['cinemaShow.room', 'cinemaShow.movie', 'cinemaShow.movie.image']
  })
  return result
}

export const ticketService = {
  create,
  update,
  findOne,
  findAll,
  updateState
}
