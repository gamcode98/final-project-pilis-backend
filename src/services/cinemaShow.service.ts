import { CinemaShowDto, UpdateCinemaShowDto } from '../dtos'
import { CinemaShow } from '../entities'

const create = async ({ date, hour, minutes, price, movie, room }: CinemaShowDto) => {
  const cinemaShow = new CinemaShow()

  cinemaShow.date = date
  cinemaShow.hour = hour
  cinemaShow.minutes = minutes
  cinemaShow.price = price
  cinemaShow.room = room
  cinemaShow.movie = movie
  cinemaShow.capacityAvailable = room.capacity

  const result = await cinemaShow.save()
  return result
}

const findAll = async () => {
  const result = await CinemaShow.find()
  return result
}

const findOne = async (term: { id?: number } | { room: { id: number } }) => {
  const result = await CinemaShow.findOne({ where: term, relations: ['movie', 'room', 'tickets'] })
  return result
}

const update = async (id: number, updateCinemaShowDto: UpdateCinemaShowDto) => {
  const result = await CinemaShow.update(id, updateCinemaShowDto)
  return result
}

const remove = async (id: number) => {
  const result = await CinemaShow.delete(id)
  return result
}

export const cinemaShowService = {
  create,
  findAll,
  findOne,
  update,
  remove
}
