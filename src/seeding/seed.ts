import { settings } from '../config'
import { AppDataSource } from '../db'
import { RoomDto } from '../dtos'
import { ROLES } from '../enums'
import { createRole, createUser, roomService } from '../services'
import { encryptPassword } from '../utils'

const initialRooms: RoomDto[] = [
  { name: 'Estelar', capacity: 40 },
  { name: 'Solaz', capacity: 10 },
  { name: 'Venus', capacity: 20 },
  { name: 'Mercurio', capacity: 30 },
  { name: 'Luminar', capacity: 24 }
]

const seed = async () => {
  console.log('RUNNING SEED\n')
  await AppDataSource.initialize()

  await createRole(ROLES.CUSTOMER)
  const adminRole = await createRole(ROLES.ADMIN)

  const admin = {
    username: settings.adminUsername ?? 'admin',
    email: settings.adminEmail ?? 'admin@gmail.com',
    password: settings.adminPassword ?? '123okAsd@'
  }

  const passwordHash = await encryptPassword(admin.password)

  await createUser({ username: admin.username, email: admin.email, password: passwordHash, role: adminRole })

  for await (const room of initialRooms) {
    await roomService.create(room)
  }

  await AppDataSource.destroy()
  console.log('SEED EXECUTED\n')
}

void seed()
