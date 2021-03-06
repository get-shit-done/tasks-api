import { Request, Response } from 'express'
import { success, failure } from '../utils'
import { ITask, TasksModel } from '../models/tasksModel'

const tasksResponseMapping = (tasks: ITask[]) => {
  const obj: any = {}

  tasks.forEach(({ timestamp }) => {
    obj[timestamp] = {
      tasks: tasks.filter(t => t.timestamp === timestamp).sort((a, b) => a.time[0] - b.time[0]),
    }
  })
  return obj
}

export const getTasks = async (req: Request, res: Response) => {
  try {
    const { month } = req.query
    const monthAsString = month as string
    const monthRegex = new RegExp(`${monthAsString}.+2021`, 'g')
    const tasks = await TasksModel.find().where('timestamp').regex(monthRegex)
    const mappedTasks = tasksResponseMapping(tasks)
    success({ statusCode: 200, data: mappedTasks, res })
  } catch (error) {
    failure({ statusCode: 500, errorMessage: 'could not find tasks', res })
  }
}
export const addTask = async (req: Request, res: Response) => {
  try {
    const task = await TasksModel.create(req.body)
    success({ statusCode: 200, data: task, res })
  } catch (error) {
    failure({ statusCode: 500, errorMessage: 'could not add task', res })
  }
}
export const addTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await TasksModel.insertMany(req.body)
    success({ statusCode: 200, data: tasks, res })
  } catch (error) {
    failure({ statusCode: 500, errorMessage: 'could not add tasks', res })
  }
}
export const getTask = async (req: Request, res: Response) => {
  try {
    const task = await TasksModel.findById(req.params.id)
    success({ statusCode: 200, data: task!, res })
  } catch (error) {
    failure({ statusCode: 500, errorMessage: 'could not find task', res })
  }
}
export const updateTask = async (req: Request, res: Response) => {
  try {
    const task = await TasksModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    success({ statusCode: 200, data: task!, res })
  } catch (error) {
    failure({ statusCode: 500, errorMessage: 'could not update task', res })
  }
}
export const deleteTask = async (req: Request, res: Response) => {
  try {
    await TasksModel.findByIdAndDelete(req.params.id)
    success({ statusCode: 200, res })
  } catch (error) {
    failure({ statusCode: 500, errorMessage: 'could not delete task', res })
  }
}
export const deleteAllTasks = async (req: Request, res: Response) => {
  try {
    await TasksModel.deleteMany({})
    success({ statusCode: 200, res })
  } catch (error) {
    failure({ statusCode: 500, errorMessage: 'could not delete all tasks', res })
  }
}
