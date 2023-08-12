import { DataSource } from 'typeorm'
import { settings } from './config'
import { Image, Movie, Role, Room, User } from './entities'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: settings.dbHost,
  port: 5432,
  username: settings.dbUsername,
  password: settings.dbPassword,
  database: settings.dbName,
  synchronize: true,
  entities: [User, Role, Movie, Image, Room]
})
