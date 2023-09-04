import { BaseDto } from '.'
import { CinemaShow, User } from '../entities'

export interface TicketDto extends BaseDto {
  quantity: number
  qrCode: string
  code: string
  cinemaShow: CinemaShow
  user: User
}

export interface UpdateTicketDto extends Partial<TicketDto> {
  isWorking?: boolean
}
