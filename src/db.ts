import { DataSource } from 'typeorm'
import { config } from './config'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.dbHost,
  port: 5432,
  username: config.dbUsername,
  password: config.dbPassword,
  database: config.dbName,
  synchronize: true,
  entities: []
})
