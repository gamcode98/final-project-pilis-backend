import { BaseDto } from '.'
import { CinemaShow } from '../entities'
import { TEMPORAL_RESERVATION_STATUS } from '../enums'

export interface TemporalReservationDto extends BaseDto {
  quantity: number
  cinemaShow: CinemaShow
}

export interface UpdateTemporalReservationDto extends Partial<TemporalReservationDto> {
  status?: TEMPORAL_RESERVATION_STATUS
}
