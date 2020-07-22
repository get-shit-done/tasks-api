import mongoose from 'mongoose'

interface Group {
  _id: String
  name: String
  color: String
}
const taskSchema = new mongoose.Schema<Group>({
  name: {
    type: String,
    required: [true, 'must have name'],
    unique: [true, 'must be unique'],
  },
  color: {
    type: String,
    required: [true, 'must have color'],
  },
})

export const GroupsModel = mongoose.model('Group', taskSchema)
