import express from 'express'
import {
  handleBadId,
  handleBadBody,
  getTodos,
  addTodo,
  getTodo,
  updateTodo,
  deleteTodo,
} from '../controllers/todosController.js'

export const router = express.Router()
router.param('id', handleBadId)

router.route('/').get(getTodos).post(handleBadBody, addTodo)
router.route('/:id').get(getTodo).patch(updateTodo).delete(deleteTodo)
