const { currentUserID } = require('../middlewares/authMiddleWares')
const Channel = require('../models/channel')
const ChannelUser = require('../models/channelUser')
const Message = require('../models/message')

const get_message = async (req, res) => {
    const { channelID } = req.params;
    const token = req.headers.authorization.split(' ')[1]
    const userID = await currentUserID(token);

    const channelUser = await ChannelUser.findOne({
        channelID: channelID,
        userID: userID
    }).select('createdAt deletedAt -_id')

    const channel = await Channel.findOne({ _id: channelID }).select('name');
    const startDate = channelUser.createdAt;
    const endDate = channelUser.deletedAt == null ? Date.now() : channelUser.deletedAt;

    Message.find({
        channelID: channelID,
        createdAt: { $gt: startDate, $lt: endDate }
    })
        .populate({
            path: 'senderID',
            select: 'name surname'
        })
        .select('senderID content createdAt')
        .then((messages) => {
            const formattedMessages = messages.map((message) => {
                return {
                    _id: message._id,
                    sender: {
                        _id: message.senderID._id,
                        name: message.senderID.name,
                        surname: message.senderID.surname
                    },
                    content: message.content,
                    createdAt: message.createdAt
                };
            });
    
            res.json({ 
                messages: formattedMessages, 
                channel: {
                    _id: channel._id,
                    name: channel.name
                }, 
            });
        })
        .catch((e) => {
            res.json({ status: false, error: e });
        });
    
};

module.exports = {
    get_message
}