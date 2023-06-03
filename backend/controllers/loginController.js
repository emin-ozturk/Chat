const jwt = require('jsonwebtoken')

const User = require('../models/user')

const maxAge = 60 * 60 * 24

const post_login = async (req, res) => {
    const { username, password } = req.body
    
    if (password == '' || password == undefined) {
        return res.json({ status: false, message: 'Şifre girilmedi' })
    }

    if (username == '' || username == undefined) {
        return res.json({ status: false, message: 'Kullanıcı adı girilmedi' })
    }

    const isUser = await checkUser(username, password)
    if (isUser != null) {
        const token = await createToken(isUser)
        res.cookie('chatCookie', token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.json({ status: true })
    } else {
        res.json({ status: false })
    }
}

const checkUser = async (username, password) => {
    return await User.findOne({ username: username, password: password })
}

const createToken = (currentUser) => {
    return jwt.sign({ _id: currentUser._id }, 'admin', { expiresIn: maxAge })
}

module.exports = {
    post_login
}