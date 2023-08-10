import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { boomErrorHandler, errorHandler, logErrors } from './middlewares'
import './utils/auth'

const app = express()
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.static('public'))

app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

app.use(express.urlencoded({ extended: false }))

export default app
