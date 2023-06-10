const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const cors = require('cors')
const express = require('express')

const app = express()

app.use(cookieParser())
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

// CORS ayarları
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

app.listen(4000, () => {
    console.log('4000 portunda server başladı')
})

module.exports = app