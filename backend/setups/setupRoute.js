const { requireAuth } = require('../middlewares/authMiddleWares')
const channelRoutes = require('../routes/channelRoutes')
const loginRoutes = require('../routes/loginRoutes')
const logoutRoutes = require('../routes/logoutRoutes')
const messageRoutes = require('../routes/messageRoutes')
const signupRoutes = require('../routes/signupRoutes')
const userRoutes = require('../routes/userRoutes')

const setup = (app) => {
    app.use('/login', loginRoutes)
    app.use('/signup', signupRoutes)
    app.get('*', requireAuth)
    app.post('*', requireAuth)
    app.use('/channel', channelRoutes)
    app.use('/logout', logoutRoutes)
    app.use('/message', messageRoutes)
    app.use('/user', userRoutes)
}

module.exports = setup