import { BaseDto } from '.'
import { Role } from '../entities'

export interface UserDto extends BaseDto {
  username: string
  email: string
  password: string
  role: Role
}
