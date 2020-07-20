const express = require('express')
// const http = require('http')
const fs = require('fs')
const bodyParser = require('body-parser')

// const url = require('url')

const app = express()
const dayTasks = JSON.parse(fs.readFileSync(`${__dirname}/src/data/day-tasks.json`))

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/api/v1/day-tasks', (req, res) => {
  res.send({
    status: 'success',
    data: {
      dayTasks,
    },
  })
})

app.post('/api/v1/day-tasks', (req, res) => {
  console.log(req.body)
  res.send('tsdfsdf')
})
// const app = http.createapp((req, res) => {
//   console.log(req.url)
//   if (req.url.includes('text')) {
//     const text = fs.readFile(`${__dirname}/text.json`, 'utf-8', (err, data) => {
//       const parsed = JSON.parse(data)
//       res.end(`${parsed.name}, ${parsed.surname}`)
//     })
//   } else {
//     res.end('hello')
//   }
// })

app.listen(8000, () => {
  console.log('started on port 8000')
})
