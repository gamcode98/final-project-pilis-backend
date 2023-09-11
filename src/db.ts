import { DataSource } from 'typeorm'
import { settings } from './config'
import { CinemaShow, Image, Movie, Payment, Role, Room, TemporalReservation, Ticket, User } from './entities'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: settings.dbHost,
  port: 5432,
  username: settings.dbUsername,
  password: settings.dbPassword,
  database: settings.dbName,
  synchronize: true,
  ssl: true,
  entities: [
    User,
    Role,
    Movie,
    Image,
    Room,
    CinemaShow,
    Payment,
    Ticket,
    TemporalReservation
  ]
})
