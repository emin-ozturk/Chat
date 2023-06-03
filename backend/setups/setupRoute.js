const { requireAuth } = require('../middlewares/authMiddleWares')
const channelRoutes = require('../routes/channelRoutes')
const loginRoutes = require('../routes/loginRoutes')
const logoutRoutes = require('../routes/logoutRoutes')
const singupRoutes = require('../routes/singupRoutes')

const setup = (app) => {
    app.use('/login', loginRoutes)
    app.get('*', requireAuth)
    app.post('*', requireAuth)
    app.use('/channel', channelRoutes)
    app.use('/logout', logoutRoutes)
    app.use('/singup', singupRoutes)
}

module.exports = setup