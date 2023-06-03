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
        await insertUserToChannel(userID[i], channel._id)
    }
    res.json({ status: true }) 
}

const post_insert_user = async (req, res) => {
    const { userID, channelID } = req.body
    await insertUserToChannel(userID, channelID)
    res.json({ status: true }) 
}

const insertUserToChannel = (userID, channelID) => {
    const channelUser = new ChannelUser()
    channelUser.channelID = channelID
    channelUser.userID = userID
    channelUser.save()
}

module.exports = {
    get_channel,
    post_create_channel,
    post_insert_user
}