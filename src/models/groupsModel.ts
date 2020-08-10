import mongoose from 'mongoose'

interface Group {
  _id: String
  name: String
  colorId: String
}
const taskSchema = new mongoose.Schema<Group>({
  name: {
    type: String,
    required: [true, 'must have name'],
    unique: [true, 'must be unique'],
  },
  colorId: {
    type: String,
    required: [true, 'must have colorId'],
  },
})

export const GroupsModel = mongoose.model('Group', taskSchema)
