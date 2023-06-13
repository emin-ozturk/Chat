const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const cors = require('cors')
const express = require('express')
const http = require('http')
const setupRoute = require('./setupRoute')

const app = express()
const server = http.createServer(app)

app.use(cookieParser())
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
});

setupRoute(app)

server.listen(4000, () => {
  console.log('4000 portunda server başladı')
})

module.exports = server