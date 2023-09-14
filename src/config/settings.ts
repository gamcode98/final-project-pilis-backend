import 'dotenv/config'

export const settings = {
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  dbUsername: process.env.DB_USERNAME,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  frontendUrl: process.env.FRONTEND_URL,
  mobileUrl: process.env.MOBILE_URL,
  backendUrl: process.env.BACKEND_URL,
  backendBackUrl: process.env.BACKEND_BACK_URL,
  pathStorage: process.env.PATH_STORAGE,
  smtpEmail: process.env.SMTP_EMAIL,
  smtpPassword: process.env.SMTP_PASSWORD,
  adminUsername: process.env.ADMIN_USERNAME,
  adminEmail: process.env.ADMIN_EMAIL,
  adminPassword: process.env.ADMIN_PASSWORD,
  cloudinaryName: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  mercadopagoApiKey: process.env.MERCADOPAGO_API_KEY
}
