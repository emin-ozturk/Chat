const Message = require('../models/message')

const get_message = (req, res) => {
    const  { channelID } = req.body
    Message.find({ channelID: channelID })
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