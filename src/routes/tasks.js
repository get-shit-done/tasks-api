import express from 'express'
import { getTasks, addTask, getTask, updateTask, deleteTask } from '../controllers/tasksController.js'

export const router = express.Router()

router.route('/').get(getTasks).post(addTask)
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)
