import { Role } from '../entities'
import { ROLES } from '../enums'

export const createRole = async (roleName: ROLES) => {
  const role = new Role()
  role.name = roleName
  const result = await role.save()
  return result
}

export const findOneRole = async (roleName: ROLES) => {
  const result = await Role.findOneBy({ name: roleName })
  return result
}
