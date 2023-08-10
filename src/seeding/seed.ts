import { config } from '../config'
import { AppDataSource } from '../db'
import { ROLES } from '../enums'
import { createRole, createUser } from '../services'
import { encryptPassword } from '../utils/bcrypt.handler'

export const seed = async () => {
  console.log('RUNNING SEED\n')
  await AppDataSource.initialize()

  await createRole(ROLES.CUSTOMER)
  const adminRole = await createRole(ROLES.ADMIN)

  const admin = {
    email: config.adminEmail ?? 'admin@gmail.com',
    password: config.adminPassword ?? '123okAsd'
  }

  const passwordHash = await encryptPassword(admin.password)

  await createUser({ email: admin.email, password: passwordHash, role: adminRole })

  await AppDataSource.destroy()
  console.log('SEED EXECUTED\n')
}

void seed()
