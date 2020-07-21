import { app } from './index'

app.listen(process.env.PORT, () => {
  console.log(`started on port ${process.env.PORT}`)
})
