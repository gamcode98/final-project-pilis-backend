import { BaseDto } from '.'

export interface RoomDto extends BaseDto {
  name: string
  capacity: number
}
