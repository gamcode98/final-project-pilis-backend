import { BaseDto } from '.'

export interface CinemaShowDto extends BaseDto {
  date: Date
  hour: number
  minutes: number
  price: number
  roomId: number
  movieId: number
}
