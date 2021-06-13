import express from 'express'
import { getTasks, addTask, getTask, updateTask, deleteTask, deleteAllTasks } from '../controllers/tasksController'

export const router = express.Router()

router.route('/').get(getTasks).post(addTask).delete(deleteAllTasks)
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)
