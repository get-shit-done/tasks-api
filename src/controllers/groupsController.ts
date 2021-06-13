import { Request, Response } from 'express'
import { success, failure } from '../utils'
import { GroupsModel } from '../models/groupsModel'

export const getGroups = async (req: Request, res: Response) => {
  try {
    const groups = await GroupsModel.find()
    success({ statusCode: 200, data: groups, res })
  } catch (error) {
    failure({ statusCode: 500, errorMessage: 'could not find groups', res })
  }
}
export const addGroup = async (req: Request, res: Response) => {
  try {
    const group = await GroupsModel.create(req.body)
    success({ statusCode: 200, data: group, res })
  } catch (error) {
    failure({ statusCode: 500, errorMessage: 'could not add group', res })
  }
}
export const getGroup = async (req: Request, res: Response) => {
  try {
    const group = await GroupsModel.findById(req.params.id)
    success({ statusCode: 200, data: group!, res })
  } catch (error) {
    failure({ statusCode: 500, errorMessage: 'could not find group', res })
  }
}
export const updateGroup = async (req: Request, res: Response) => {
  try {
    const group = await GroupsModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    success({ statusCode: 200, data: group!, res })
  } catch (error) {
    failure({ statusCode: 500, errorMessage: 'could not update group', res })
  }
}
export const deleteGroup = async (req: Request, res: Response) => {
  try {
    await GroupsModel.findByIdAndDelete(req.params.id)
    success({ statusCode: 200, res })
  } catch (error) {
    failure({ statusCode: 500, errorMessage: 'could not delete group', res })
  }
}
