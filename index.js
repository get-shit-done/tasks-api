import express from 'express'
import fs from 'fs'
import bodyParser from 'body-parser'
import path from 'path'
import { v4 as uuid } from 'uuid'
import { success, failure } from './src/utils.js'

const __dirname = path.resolve()
const todos = JSON.parse(fs.readFileSync(`${__dirname}/src/data/todos.json`))

const app = express()
app.use(bodyParser.json())

const getTasks = (req, res) => {
  res.send({
    status: 'success',
    data: {
      todos,
    },
  })
}
const getTask = (req, res) => {
  const todo = todos.find(x => x.id === req.params.id)
  todo ? success({ statusCode: 200, data: todo, res }) : failure({ statusCode: 404, res })
}
const updateTask = (req, res) => {
  const todo = todos.find(x => x.id === req.params.id)
  const updatedTodo = todo ? { ...todo, ...req.body } : undefined
  todo ? success({ statusCode: 200, data: updatedTodo, res }) : failure({ statusCode: 404, res })
}
const deleteTask = (req, res) => {
  const todo = todos.find(x => x.id === req.params.id)
  todo ? success({ statusCode: 204, res }) : failure({ statusCode: 404, res })
}
const addTask = (req, res) => {
  const newTodo = {
    id: uuid(),
    ...req.body,
  }
  const updatedTodos = [...todos, newTodo]

  fs.writeFile(`${__dirname}/src/data/todos.json`, JSON.stringify(updatedTodos), () => {
    success({ statusCode: 201, data: newTodo, res })
  })
}

app.get('/api/v1/todos', getTasks)
app.get('/api/v1/todos/:id', getTask)
app.patch('/api/v1/todos/:id', updateTask)
app.delete('/api/v1/todos/:id', deleteTask)
app.post('/api/v1/todos', addTask)

app.listen(8000, () => {
  console.log('started on port 8000')
})
