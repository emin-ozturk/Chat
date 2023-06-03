const mongoose = require('mongoose')

const URL = 'mongodb://localhost:27017/chat'
mongoose.set('strictQuery', true)
mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => console.log("MongoDB'ye bağlandı"))
    .catch((err) => console.log(err))

module.exports = mongoose
