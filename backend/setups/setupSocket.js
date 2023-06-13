const { currentUserID } = require('../middlewares/authMiddleWares')
const Channel = require('../models/channel')
const Message = require('../models/message')
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
                    ack(createResponse(message));
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

const createResponse = (message) => {
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
    }
}

module.exports = {
    setup
}
