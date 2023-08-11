import { v2 as cloudinary, UploadApiResponse } from 'cloudinary'
import streamifier from 'streamifier'
import { settings } from '../config'

cloudinary.config({
  cloud_name: settings.cloudinaryName,
  api_key: settings.cloudinaryApiKey,
  api_secret: settings.cloudinaryApiSecret,
  secure: true
})

export const uploadToCloudinary = async (buffer: Buffer): Promise<UploadApiResponse | undefined> => {
  return await new Promise((resolve, reject) => {
    const cldUploadStream = cloudinary.uploader.upload_stream(
      { folder: 'cinema-app' },
      (error, result) => {
        if (error) {
          reject(error)
        } else {
          resolve(result)
        }
      }
    )

    streamifier.createReadStream(buffer).pipe(cldUploadStream)
  })
}
