import express from 'express'
import fs from 'fs'
import bodyParser from 'body-parser'
import path from 'path'
import morgan from 'morgan'

import { router as tasksRouter } from './src/routes/tasks.js'
import { router as groupsRouter } from './src/routes/groups.js'

const app = express()
app.use(morgan('dev'))
app.use(bodyParser.json())

app.use('/api/v1/todos', tasksRouter)
app.use('/api/v1/groups', groupsRouter)

app.listen(8000, () => {
  console.log('started on port 8000')
})
