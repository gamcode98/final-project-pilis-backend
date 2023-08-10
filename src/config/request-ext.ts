import { JwtPayload } from 'jsonwebtoken'
import { UserDto } from '../dtos'

export interface RequestExt extends Request {
  user: JwtPayload | UserDto
}
