const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema({
    senderID: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
        require: true,
    },
    channelID: {
        type: String,
        require: true,
        default: null
    },
    content: {
        type: String,
        require: true,
        default: null
    }
}, {timestamps: true})

module.exports = mongoose.model('Message', messageSchema)