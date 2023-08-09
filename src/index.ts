import 'reflect-metadata'
import { AppDataSource } from './db'
import { config } from './config'
import app from './app'

async function main () {
  try {
    await AppDataSource.initialize()
    console.log('Database Connected 🚀')
    app.listen(config.port, () => console.log(`App listening on port: ${config.port}`))
  } catch (error) {
    console.error(error)
  }
}

void main()
