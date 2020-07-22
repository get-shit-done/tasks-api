import mongoose from 'mongoose'

const todoSchema = new mongoose.Schema({
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
