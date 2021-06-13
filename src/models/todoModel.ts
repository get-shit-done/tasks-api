import mongoose from 'mongoose'

interface Todos {
  _id: string
  todoName: string
  isDone: boolean
}

const todoSchema = new mongoose.Schema<Todos>({
  todoName: {
    type: String,
    unique: true,
    required: [true, 'must have name'],
  },
  isDone: {
    type: Boolean,
    default: false,
  },
})
export const TodoModel = mongoose.model('Todo', todoSchema)
