import express from 'express'

const getGroups = (req, res) => {
  res.status(500).json({ status: 'error', message: 'not yet defined' })
}
const addGroup = (req, res) => {
  res.status(500).json({ status: 'error', message: 'not yet defined' })
}
const getGroup = (req, res) => {
  res.status(500).json({ status: 'error', message: 'not yet defined' })
}
const updateGroup = (req, res) => {
  res.status(500).json({ status: 'error', message: 'not yet defined' })
}
const deleteGroup = (req, res) => {
  res.status(500).json({ status: 'error', message: 'not yet defined' })
}

export const router = express.Router()

router.route('/').get(getGroups).post(addGroup)
router.route('/:id').get(getGroup).patch(updateGroup).delete(deleteGroup)
