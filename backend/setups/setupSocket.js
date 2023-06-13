const { currentUserID } = require('../middlewares/authMiddleWares')
const Message = require('../models/message')
const Channel = require('../models/channel')
const socket = require('socket.io')

const setup = (server) => {
    const io = socket(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
            allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept']
        }
    })
    watchSocket(io)
}

const watchSocket = (io) => {
    io.on('connection', (socket) => {
        socket.on('newMessage', async (data, ack) => {
            const { channelID, content, token } = data

            const userID = await currentUserID(token)
            const channel = await getChannel(channelID)
            const message = await createMessage({
                'senderID': userID,
                'channelID': channelID,
                'content': content
            })

            Message.findOne({ _id: message._id, })
                .populate({
                    path: 'senderID',
                    select: 'name surname'
                })
                .select('senderID content createdAt')
                .then(async (message) => {
                    ack(createResponse(message, channel));
                })
                .catch((e) => {
                    console.log(e)
                });
        });
    });
}

const createMessage = async (message) => {
    return await new Message(message).save()
}

const getChannel = async (channelID) => {
    return await Channel.findOne({ _id: channelID }).select('name');
}

const createResponse = (message, channel) => {
    return {
        messages: {
            _id: message._id,
            sender: {
                _id: message.senderID._id,
                name: message.senderID.name,
                surname: message.senderID.surname
            },
            content: message.content,
            createdAt: message.createdAt
        },
        channel: {
            _id: channel._id,
            name: channel.name
        },
    }
}

module.exports = {
    setup
}
