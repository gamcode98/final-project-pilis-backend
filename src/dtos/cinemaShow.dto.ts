import { BaseDto } from '.'
import { Movie, Room } from '../entities'

export interface CinemaShowDto extends BaseDto {
  date: Date
  hour: number
  minutes: number
  price: number
  room: Room
  movie: Movie
}

export interface UpdateCinemaShowDto extends Partial<CinemaShowDto> {
  capacityAvailable?: number
}
