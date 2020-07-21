import fs from 'fs'
import { v4 as uuid } from 'uuid'

import { __dirname, success, failure } from '../utils'
import { Request, Response, NextFunction } from 'express'

interface Todos {
  id: string
  todoName: string
  isDone: boolean
}

const todos: Todos[] = JSON.parse(fs.readFileSync(`${__dirname}/src/data/todos.json`, 'utf-8'))

export const handleBadId = (req: Request, res: Response, next: NextFunction, id: string) => {
  const selectedTodo = todos.find(x => x.id === id)
  if (!selectedTodo) {
    return failure({ statusCode: 404, res })
  }
  next()
}

export const handleBadBody = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.todoName || req.body.isDone === undefined) {
    return failure({ statusCode: 400, res })
  }
  next()
}

export const getTodos = (req: Request, res: Response) => {
  res.send({
    status: 'success',
    data: {
      todos,
    },
  })
}

export const getTodo = (req: Request, res: Response) => {
  const todo = todos.find(x => x.id === req.params.id)
  success({ statusCode: 200, data: todo, res })
}
export const updateTodo = (req: Request, res: Response) => {
  const todo = todos.find(x => x.id === req.params.id)
  const updatedTodo = todo ? { ...todo, ...req.body } : undefined
  success({ statusCode: 200, data: updatedTodo, res })
}
export const deleteTodo = (req: Request, res: Response) => {
  success({ statusCode: 204, res })
}
export const addTodo = (req: Request, res: Response) => {
  const newTodo = {
    id: uuid(),
    ...req.body,
  }
  const updatedTodos = [...todos, newTodo]

  fs.writeFile(`${__dirname}/src/data/todos.json`, JSON.stringify(updatedTodos), () => {
    success({ statusCode: 201, data: newTodo, res })
  })
}
