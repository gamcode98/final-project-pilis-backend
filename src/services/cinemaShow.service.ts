import { CinemaShowDto } from '../dtos'
import { CinemaShow } from '../entities'

const create = async ({ date, hour, minutes, price, movieId, roomId }: CinemaShowDto) => {
  const cinemaShow = new CinemaShow()

  cinemaShow.date = date
  cinemaShow.hour = hour
  cinemaShow.minutes = minutes
  cinemaShow.price = price
  cinemaShow.movieId = movieId
  cinemaShow.roomId = roomId

  const result = await cinemaShow.save()
  return result
}

const findAll = async () => {
  const result = await CinemaShow.find()
  return result
}

const findOne = async (term: { id?: number, roomId?: number }) => {
  const result = await CinemaShow.findOne({ where: term, relations: ['movie', 'room'] })

  return result
}

export const cinemaShowService = {
  create,
  findAll,
  findOne
}
