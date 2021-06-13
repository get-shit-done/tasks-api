import mongoose from 'mongoose'

export interface ITask extends mongoose.Document {
  timestamp: string
  _id: string
  name: string
  group: string
  time: number[]
}

const taskSchema = new mongoose.Schema<ITask>({
  timestamp: {
    type: String,
    required: [true, 'must have timestamp'],
  },
  name: {
    type: String,
    required: [true, 'must have name'],
  },
  group: {
    type: String,
    required: [true, 'must be grouped'],
  },
  time: [Number],
})

export const TasksModel = mongoose.model<ITask>('Task', taskSchema)
