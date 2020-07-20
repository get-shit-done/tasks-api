const express = require('express')
// const http = require('http')
// const fs = require('fs')
// const url = require('url')

const server = express()

server.get('/', (req, res) => {
  res.status(200).send('boom!')
})
// const server = http.createServer((req, res) => {
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

server.listen(8000, () => {
  console.log('started on port 8000')
})
