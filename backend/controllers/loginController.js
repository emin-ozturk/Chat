const jwt = require('jsonwebtoken')

const User = require('../models/user')

const maxAge = 60 * 60 * 24

const post_login = async (req, res) => {
    const { username, password } = req.body
    
    if (password == '' || password == undefined) {
        return res.status(401).json({ message: 'Şifre girilmedi' })
    }

    if (username == '' || username == undefined) {
        return res.status(401).json({ message: 'Kullanıcı adı girilmedi' })
    }

    const isUser = await checkUser(username, password)
    if (isUser != null) {
        const token = await createToken(isUser)
        res.cookie('chatCookie', token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(200).json({ message: 'Giriş başarılı' })
    } else {
        res.status(401).json({ message: 'Kullanıcı adı veya şifre hatalı' })
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