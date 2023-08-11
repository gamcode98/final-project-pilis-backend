import { MovieDto } from '../dtos'
import { Movie } from '../entities'

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

const findAll = async () => {
  const result = await Movie.find({ relations: ['image'] })

  return result
}

const findOne = async (id: MovieDto['id']) => {
  const result = await Movie.findOne({ where: { id }, relations: ['image'] })

  return result
}

export const movieService = {
  create,
  findAll,
  findOne
}
