import { app } from './index.js'

app.listen(process.env.PORT, () => {
  console.log(`started on port ${process.env.PORT}`)
})
