const mongoose = require('mongoose')
const Schema = mongoose.Schema

const channelUserSchema = new Schema({
    channelID: {
        type: String,
        require: true,
        default: null
    },
    userID: {
        type: String,
        require: true,
        default: null
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, {timestamps: true})

module.exports = mongoose.model('ChannelUser', channelUserSchema)