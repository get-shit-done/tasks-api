import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { router as todosRouter } from './src/routes/todos'
import { router as groupsRouter } from './src/routes/groups'

dotenv.config({ path: './config.env' })

export const app = express()
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
app.use(bodyParser.json())
app.use('/api/v1/todos', todosRouter)
app.use('/api/v1/groups', groupsRouter)
