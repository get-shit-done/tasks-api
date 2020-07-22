import mongoose from 'mongoose'

interface Task {
  _id: String
  name: String
  group: String
  instances: Object
}
const taskSchema = new mongoose.Schema<Task>({
  name: {
    type: String,
    required: [true, 'must have name'],
    unique: [true, 'must be unique'],
  },
  group: {
    type: String,
    required: [true, 'must be grouped'],
    unique: [true, 'must be unique'],
  },
  instances: Object,
})

export const TasksModel = mongoose.model('Task', taskSchema)
