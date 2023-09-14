import { Image } from '../entities'
import { GENDERS } from '../enums'
import { BaseDto } from './base.dto'

export interface MovieDto extends BaseDto {
  title: string
  duration: string
  gender: GENDERS
  director: string
  description: string
  trailerUrl: string
  image: Image
}

export interface UpdateMovieDto extends Partial<MovieDto> { }
