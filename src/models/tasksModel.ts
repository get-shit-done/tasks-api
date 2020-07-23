import mongoose from 'mongoose'

export interface ITask extends mongoose.Document {
  // timeStamp: string
  // time: number[]
  _id: string
  name: string
  group: string
  instances: {
    [key: string]: number[] | number[][]
  }
}

const taskSchema = new mongoose.Schema<ITask>({
  // timeStamp: {
  //   type: String,
  //   required: [true, 'must have timeStamp'],
  //   unique: [true, 'must be unique'],
  // },
  // time: Array,
  name: {
    type: String,
    required: [true, 'must have name'],
    unique: [true, 'must be unique'],
  },
  group: {
    type: String,
    required: [true, 'must be grouped'],
  },
  instances: Object,
})

export const TasksModel = mongoose.model<ITask>('Task', taskSchema)
