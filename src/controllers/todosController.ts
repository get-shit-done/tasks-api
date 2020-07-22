import { Request, Response, NextFunction } from 'express'

import { __dirname, success, failure } from '../utils'
import { TodoModel } from '../models/todoModel'

interface Todos {
  id: string
  todoName: string
  isDone: boolean
}

// export const handleBadBody = (req: Request, res: Response, next: NextFunction) => {
//   if (!req.body.todoName || req.body.isDone === undefined) {
//     return failure({ statusCode: 400, res })
//   }
//   next()
// }

export const getTodos = (req: Request, res: Response) => {
  res.send({
    status: 'success',
    data: {},
  })
}

export const getTodo = (req: Request, res: Response) => {
  // const todo = todos.find(x => x.id === req.params.id)
  // success({ statusCode: 200, data: todo, res })
}
export const updateTodo = (req: Request, res: Response) => {
  // const todo = todos.find(x => x.id === req.params.id)
  // const updatedTodo = todo ? { ...todo, ...req.body } : undefined
  // success({ statusCode: 200, data: updatedTodo, res })
}
export const deleteTodo = (req: Request, res: Response) => {
  success({ statusCode: 204, res })
}
export const addTodo = async (req: Request, res: Response) => {
  try {
    const newTodo = await TodoModel.create(req.body)
    success({ statusCode: 201, data: newTodo, res })
  } catch (error) {
    failure({ statusCode: 400, errorMessage: 'invalid data', res })
  }
}
