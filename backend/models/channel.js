const mongoose = require('mongoose')
const Schema = mongoose.Schema

const channelSchema = new Schema({
    name: {
        type: String,
        require: true,
        default: null
    },
    description: {
        type: String,
        require: true,
        default: null
    }
}, {timestamps: true})

module.exports = mongoose.model('Channel', channelSchema)