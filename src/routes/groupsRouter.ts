import express from 'express'
import { getGroups, addGroup, getGroup, updateGroup, deleteGroup } from '../controllers/taskGroupsController'

export const router = express.Router()

router.route('/').get(getGroups).post(addGroup)
router.route('/:id').get(getGroup).patch(updateGroup).delete(deleteGroup)
