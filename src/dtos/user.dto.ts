import { BaseDto } from '.'
import { Role } from '../entities'

export interface UserDto extends BaseDto {
  email: string
  password: string
  role: Role
}
