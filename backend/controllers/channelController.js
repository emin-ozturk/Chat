const Channel = require('../models/channel')
const ChannelUser = require('../models/channelUser')

const get_channel = async (req, res) => {
    const currentUserID = req.res.locals.currentUserID
    const channelIDs = await ChannelUser.find({ userID: currentUserID }).select('channelID -_id')
    const targetIds = channelIDs.map(obj => obj.channelID)
    const channels = await Channel.find({ _id: { $in: targetIds } })
    res.json(channels)
}

const post_create_channel = async (req, res) => {
    const { name, description, userID } = req.body

    const channel = await new Channel({ name: name, description: description }).save()
    
    for (let i = 0; i < userID.length; i++) {
        const channelUser = new ChannelUser()
        channelUser.channelID = channel._id
        channelUser.userID = userID[i]
        channelUser.save()
    }
    
    res.json({status: true, message: 'Kanal oluşturuldu'})
}

module.exports = {
    get_channel,
    post_create_channel
}