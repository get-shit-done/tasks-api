import { Request, Response, NextFunction } from 'express'

import { __dirname, success, failure } from '../utils'
import { TodoModel } from '../models/todoModel'

// export const handleBadBody = (req: Request, res: Response, next: NextFunction) => {
//   if (!req.body.todoName || req.body.isDone === undefined) {
//     return failure({ statusCode: 400, res })
//   }
//   next()
// }

export const getTodos = async (req: Request, res: Response) => {
  try {
    const todos = await TodoModel.find()
    success({ statusCode: 201, data: todos, res })
  } catch (error) {
    failure({ statusCode: 400, errorMessage: 'some error', res })
  }
}
export const getTodo = async (req: Request, res: Response) => {
  try {
    const todo = await TodoModel.findById(req.params.id)
    success({ statusCode: 201, data: todo!, res })
  } catch (error) {
    failure({ statusCode: 404, errorMessage: 'none found', res })
  }
}
export const updateTodo = async (req: Request, res: Response) => {
  try {
    const todo = await TodoModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    success({ statusCode: 200, data: todo!, res })
  } catch (error) {
    failure({ statusCode: 400, errorMessage: 'something went wrong', res })
  }
}
export const deleteTodo = async (req: Request, res: Response) => {
  try {
    await TodoModel.findByIdAndDelete(req.params.id)
    success({ statusCode: 204, res })
  } catch (error) {
    failure({ statusCode: 400, errorMessage: 'something went wrong', res })
  }
}
export const addTodo = async (req: Request, res: Response) => {
  try {
    const newTodo = await TodoModel.create(req.body)
    success({ statusCode: 201, data: newTodo, res })
  } catch (error) {
    failure({ statusCode: 400, errorMessage: 'invalid data', res })
  }
}
