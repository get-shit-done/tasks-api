import { Request, Response } from 'express'
import { uuid } from 'uuidv4'
import { success, failure } from '../utils'
import { ITask, TasksModel } from '../models/tasksModel'

const tasksResponseMapping = (tasks: ITask[]) => {
  const mappedData: any = {}

  tasks.forEach(task => {
    const { id, name, group, instances } = task

    Object.keys(instances).forEach(dayString => {
      const isMultipleInstances = Array.isArray(instances[dayString][0])
      const defaultDayShape = { id, tasks: [] }
      mappedData[dayString] = mappedData[dayString] || defaultDayShape
      const defaultTaskShape = {
        id: uuid(),
        name,
        group,
        time: [],
      }

      if (!isMultipleInstances) {
        mappedData[dayString].tasks.push({
          ...defaultTaskShape,
          time: instances[dayString],
        })
      } else {
        // TODO: fix this any
        instances[dayString].forEach((inst: any) => {
          mappedData[dayString].tasks.push({
            ...defaultTaskShape,
            time: inst,
          })
        })
      }
    })
  })

  return mappedData
}

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await TasksModel.find(req.query)
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
