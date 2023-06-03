const cookieParser = require('cookie-parser')
const express = require('express')

const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.listen(3000, () => {
    console.log('3000 portunda server başladı')
})

module.exports = app