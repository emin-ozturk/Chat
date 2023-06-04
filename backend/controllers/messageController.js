const ChannelUser = require('../models/channelUser')
const Message = require('../models/message')

const get_message = async (req, res) => {
    const  { channelID } = req.body
    const currentUserID = req.res.locals.currentUserID
    
    const channelUser = await ChannelUser.findOne({ 
            channelID: channelID, 
            userID: currentUserID 
        }).select('createdAt deletedAt -_id')
    const startDate = channelUser.createdAt
    const endDate = channelUser.deletedAt == null ? Date.now() : channelUser.deletedAt
    Message.find({ 
        channelID: channelID, 
        createdAt: { $gt: startDate, $lt:  endDate } 
    })  
    .then((messages) => { res.json({ messages }) })
    .catch((e) => { res.json({ status: false, error: e }) })
}

const post_create_message = (req, res) => {
    const  { channelID, content } = req.body
    const currentUserID = req.res.locals.currentUserID
    const message = new Message()
    message.senderID = currentUserID
    message.channelID = channelID
    message.content = content
    message.save()
        .then(() => { res.json({ status: true }) })
        .catch((e) => { res.json({ status: false, error: e }) })
}

module.exports = {
    get_message,
    post_create_message
}