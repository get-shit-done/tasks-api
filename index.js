import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'

import { router as tasksRouter } from './src/routes/tasks.js'
import { router as groupsRouter } from './src/routes/groups.js'

export const app = express()
app.use(morgan('dev'))
app.use(bodyParser.json())

app.use('/api/v1/todos', tasksRouter)
app.use('/api/v1/groups', groupsRouter)
