import { LessThanOrEqual, MoreThan } from 'typeorm'
import { MovieDto, UpdateMovieDto } from '../dtos'
import { Movie } from '../entities'
import { ROLES } from '../enums'

const create = async (data: MovieDto) => {
  const { title, gender, description, director, trailerUrl, image } = data

  const movie = new Movie()

  movie.title = title
  movie.description = description
  movie.director = director
  movie.gender = gender
  movie.image = image
  movie.trailerUrl = trailerUrl

  const result = await movie.save()

  return result
}

const findAll = async (rol: string) => {
  const result = await Movie.find({
    relations: ['image', 'cinemaShows', 'cinemaShows.room'],
    where: rol === ROLES.ADMIN ? { cinemaShows: LessThanOrEqual(0) } : { cinemaShows: { capacityAvailable: MoreThan(0) } }
  })

  return result
}

const findOne = async (id: MovieDto['id']) => {
  const result = await Movie.findOne({ where: { id }, relations: ['image', 'cinemaShows', 'cinemaShows.room'] })

  return result
}

const update = async (id: number, updateMovieDto: UpdateMovieDto) => {
  const result = await Movie.update({ id }, updateMovieDto)

  return result
}

const remove = async (id: number) => {
  const result = await Movie.delete({ id })

  return result
}

export const movieService = {
  create,
  findAll,
  findOne,
  update,
  remove
}
