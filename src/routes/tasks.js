import express from 'express'
import fs from 'fs'
import { v4 as uuid } from 'uuid'

import { __dirname, success, failure } from '../utils.js'

const todos = JSON.parse(fs.readFileSync(`${__dirname}/src/data/todos.json`))

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

export const router = express.Router()

router.route('/').get(getTasks).post(addTask)
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)
