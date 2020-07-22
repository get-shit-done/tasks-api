import path from 'path'
import { Response } from 'express'
import { Document } from 'mongoose'

export const __dirname = path.resolve() // if set to type: module - dirname is undefined

interface ResponseParams {
  statusString?: string
  statusCode: number
  data?: Document | Document[]
  errorMessage?: string
  res: Response
}
export const determineResponse = ({ statusString, statusCode, data, errorMessage, res }: ResponseParams) =>
  res.status(statusCode).json({
    status: statusString,
    data,
    errorMessage,
  })

export const success = ({ statusCode, data, res }: ResponseParams) =>
  determineResponse({ statusString: 'success', statusCode, data, res })
export const failure = ({ statusCode, errorMessage, res }: ResponseParams) =>
  determineResponse({ statusString: 'fail', statusCode, errorMessage, res })
