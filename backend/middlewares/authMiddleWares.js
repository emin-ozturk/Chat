const jwt = require('jsonwebtoken')

const requireAuth = (req, res, next) => {
    const token = req.cookies.chatCookie
    if (token) {
        jwt.verify(token, 'admin', async (err, decodedToken) => {
            if (err) {
                res.locals.user = null
                res.json(err)
            } else {
                res.locals.currentUserID = decodedToken._id
                next()
            }
        })
    } else {
        res.locals.user = null
        res.json({ status: false, message: 'Oturum açık değil' })
        next()
    }
}


module.exports = {
    requireAuth
}

