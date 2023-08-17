import { UserDto } from '../dtos'
import { User } from '../entities'

export const createUser = async ({ email, password, role }: UserDto) => {
  const user = new User()

  user.email = email
  user.password = password
  user.rol = role

  const result = await user.save()
  return result
}

export const findOneUserByEmail = async (email: UserDto['email']) => {
  const result = await User.findOne({ where: { email }, relations: ['rol'] })
  return result
}

export const findOneUserById = async (id: UserDto['id']) => {
  const result = await User.findOne({ where: { id }, relations: ['rol'] })
  return result
}
