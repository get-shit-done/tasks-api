import mongoose from 'mongoose'
import { app } from './app'

const db = process.env.DB_CONNECTION_STRING as string
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then(() => {
  console.log('mongo connected')
})

app.listen(process.env.PORT || 3005, () => {
  console.log(`started on port ${process.env.PORT}`)
})
