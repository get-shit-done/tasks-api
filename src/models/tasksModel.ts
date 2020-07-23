import mongoose from 'mongoose'

export interface ITask extends mongoose.Document {
  id: string
  name: string
  group: string
  instances: {
    [key: string]: number[] | number[][]
  }
}

const taskSchema = new mongoose.Schema<ITask>({
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
