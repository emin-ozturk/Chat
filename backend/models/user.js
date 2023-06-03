const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    'name': {
        type: String,
        require: true,
        default: null
    },
    'surname': {
        type: String,
        require: true,
        default: null
    },
    'email': {
        type: String,
        require: true,
        default: null
    },
    'password': {
        type: String,
        require: true,
        default: null
    },
    'username': {
        type: String,
        require: true,
        default: null
    }
})

module.exports = mongoose.model('User', userSchema)