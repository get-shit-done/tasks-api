import fs from 'fs'
import { v4 as uuid } from 'uuid'

import { __dirname, success, failure } from '../utils.js'

const todos = JSON.parse(fs.readFileSync(`${__dirname}/src/data/todos.json`))

export const handleBadId = (req, res, next, id) => {
  const selectedTodo = todos.find(x => x.id === id)
  if (!selectedTodo) {
    return failure({ statusCode: 404, res })
  }
  next()
}

export const handleBadBody = (req, res, next) => {
  if (!req.body.todoName || req.body.isDone === undefined) {
    return failure({ statusCode: 400, res })
  }
  next()
}

export const getTodos = (req, res) => {
  res.send({
    status: 'success',
    data: {
      todos,
    },
  })
}
export const getTodo = (req, res) => {
  const todo = todos.find(x => x.id === req.params.id)
  success({ statusCode: 200, data: todo, res })
}
export const updateTodo = (req, res) => {
  const todo = todos.find(x => x.id === req.params.id)
  const updatedTodo = todo ? { ...todo, ...req.body } : undefined
  success({ statusCode: 200, data: updatedTodo, res })
}
export const deleteTodo = (req, res) => {
  success({ statusCode: 204, res })
}
export const addTodo = (req, res) => {
  const newTodo = {
    id: uuid(),
    ...req.body,
  }
  const updatedTodos = [...todos, newTodo]

  fs.writeFile(`${__dirname}/src/data/todos.json`, JSON.stringify(updatedTodos), () => {
    success({ statusCode: 201, data: newTodo, res })
  })
}
