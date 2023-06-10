const { currentUserID } = require('../middlewares/authMiddleWares')
const Channel = require('../models/channel')
const ChannelUser = require('../models/channelUser')
const User = require('../models/user')

const get_channel = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const userID = await currentUserID(token)
    const channelIDs = await ChannelUser.find({ userID: userID }).select('channelID -_id')
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

const get_channel_users = async (req, res) => {
    const { channelID } = req.body
    const userIDs = await ChannelUser.find({ channelID: channelID }).select('userID -_id')
    const targetIds = userIDs.map(obj => obj.userID)
    const users = await User.find({ _id: { $in: targetIds } })
    res.json(users) 
}

const insertUserToChannel = (userID, channelID) => {
    const channelUser = new ChannelUser()
    channelUser.channelID = channelID
    channelUser.userID = userID
    channelUser.save()
}

const post_leave_channel = (req, res) => {
    const { channelID } = req.body
    const currentUserID = req.res.locals.currentUserID
    ChannelUser.updateOne({ channelID: channelID, userID: currentUserID }, { deletedAt: Date.now()})
        .then(() => { res.json({ status: true }) })
        .catch((e) => { res.json({ Error: e }) })
 
}

module.exports = {
    get_channel,
    get_channel_users,
    post_create_channel,
    post_insert_user,
    post_leave_channel
}