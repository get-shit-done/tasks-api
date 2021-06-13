import express from 'express'
import { getTodos, addTodo, getTodo, updateTodo, deleteTodo } from '../controllers/todosController'

export const router = express.Router()

router.route('/').get(getTodos).post(addTodo)
router.route('/:id').get(getTodo).patch(updateTodo).delete(deleteTodo)
