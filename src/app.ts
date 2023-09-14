import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'
import { boomErrorHandler, errorHandler, logErrors } from './middlewares'
import { routerApi } from './routes'
import './utils/auth'

const app = express()
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

routerApi(app)

app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

app.use(express.urlencoded({ extended: false }))

export default app
