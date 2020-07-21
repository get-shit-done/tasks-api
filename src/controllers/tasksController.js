import fs from 'fs'
import { v4 as uuid } from 'uuid'

import { __dirname, success, failure } from '../utils.js'

const todos = JSON.parse(fs.readFileSync(`${__dirname}/src/data/todos.json`))

export const getTasks = (req, res) => {
  res.send({
    status: 'success',
    data: {
      todos,
    },
  })
}
export const getTask = (req, res) => {
  const todo = todos.find(x => x.id === req.params.id)
  todo ? success({ statusCode: 200, data: todo, res }) : failure({ statusCode: 404, res })
}
export const updateTask = (req, res) => {
  const todo = todos.find(x => x.id === req.params.id)
  const updatedTodo = todo ? { ...todo, ...req.body } : undefined
  todo ? success({ statusCode: 200, data: updatedTodo, res }) : failure({ statusCode: 404, res })
}
export const deleteTask = (req, res) => {
  const todo = todos.find(x => x.id === req.params.id)
  todo ? success({ statusCode: 204, res }) : failure({ statusCode: 404, res })
}
export const addTask = (req, res) => {
  const newTodo = {
    id: uuid(),
    ...req.body,
  }
  const updatedTodos = [...todos, newTodo]

  fs.writeFile(`${__dirname}/src/data/todos.json`, JSON.stringify(updatedTodos), () => {
    success({ statusCode: 201, data: newTodo, res })
  })
}
