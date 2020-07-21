import path from 'path'
import { Response } from 'express'

export const __dirname = path.resolve() // if set to type: module - dirname is undefined

interface ResponseParams {
  statusString?: string
  statusCode: number
  data?: any
  res: Response
}
export const determineResponse = ({ statusString, statusCode, data = {}, res }: ResponseParams) =>
  res.status(statusCode).json({
    status: statusString,
    data,
  })

export const success = ({ statusCode, data, res }: ResponseParams) =>
  determineResponse({ statusString: 'success', statusCode, data, res })
export const failure = ({ statusCode, data, res }: ResponseParams) =>
  determineResponse({ statusString: 'fail', statusCode, data, res })
