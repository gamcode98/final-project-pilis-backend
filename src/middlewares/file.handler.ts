import multer from 'multer'
import boom from '@hapi/boom'

const storage = multer.memoryStorage()

export const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const regex = /(^image)(\/)[a-zA-Z0-9_]*/
    if (!regex.test(file.mimetype)) return cb(boom.badRequest('File is not allowed'))
    cb(null, true)
  }
})
