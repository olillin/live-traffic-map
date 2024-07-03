const express = require('express')
const API = require('./api')

// Create server
const app = express()

app.use('/', express.static('./public'))

app.use('/api', API)

const port = process.env.PORT || 8080
app.listen(port)

console.log(`Listening on port ${port}`)
