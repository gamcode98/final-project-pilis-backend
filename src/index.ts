import 'reflect-metadata'
import { AppDataSource } from './db'
import { settings } from './config'
import app from './app'

async function main () {
  try {
    await AppDataSource.initialize()
    console.log('Database Connected 🚀')
    app.listen(settings.port, () => console.log(`App listening: http://localhost:${settings.port}`))
  } catch (error) {
    console.error(error)
  }
}

void main()
