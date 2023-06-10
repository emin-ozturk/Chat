const { currentUserID } = require('../middlewares/authMiddleWares')
const ChannelUser = require('../models/channelUser')
const Message = require('../models/message')

const get_message = async (req, res) => {
    const { channelID } = req.body;
    const token = req.headers.authorization.split(' ')[1];
    const userID = await currentUserID(token);
    console.log(channelID, userID);

    const channelUser = await ChannelUser.findOne({
        channelID: "647b7dd61a7e5f4bd102659c",
        userID: userID
    }).select('createdAt deletedAt -_id');

    const startDate = channelUser.createdAt;
    const endDate = channelUser.deletedAt == null ? Date.now() : channelUser.deletedAt;

    Message.find({
        channelID: "647b7dd61a7e5f4bd102659c",
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
                    id: message._id,
                    sender: {
                        id: message.senderID._id,
                        name: message.senderID.name,
                        surname: message.senderID.surname
                    },
                    content: message.content,
                    createdAt: message.createdAt
                };
            });

            res.json({ messages: formattedMessages });
        })
        .catch((e) => {
            res.json({ status: false, error: e });
        });
};



const post_create_message = (req, res) => {
    const { channelID, content } = req.body
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