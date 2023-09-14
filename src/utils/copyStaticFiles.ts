import fs from 'fs-extra'
import path from 'path'

async function copyStaticFiles () {
  try {
    await fs.copy(path.join(__dirname, '..', 'views'), 'dist/views')
    await fs.copy(path.join(__dirname, '..', 'public'), 'dist/public')
    console.log('Static files copied successfully')
  } catch (err) {
    console.error('Error copying static files: ', err)
  }
}

void copyStaticFiles()
