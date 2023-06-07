const User = require('../models/user')

const post_signup = (req, res) => {
    const { name, surname, email, password, username } = req.body

    if (name == '' || name == undefined) {
        return res.status(401).json({ status: false, message: 'Ad girilmedi' })
    }

    if (surname == '' || surname == undefined) {
        return res.status(401).json({ status: false, message: 'Soyad girilmedi' })
    }

    if (email == '' || email == undefined) {
        return res.status(401).json({ status: false, message: 'E posta girilmedi' })
    }

    if (password == '' || password == undefined) {
        return res.status(401).json({ status: false, message: 'Şifre girilmedi' })
    }

    if (username == '' || username == undefined) {
        return res.status(401).json({ status: false, message: 'Kullanıcı adı girilmedi' })
    }

    const user = new User(req.body)
    user.save()
        .then(() => { res.status(200).json({ status: true }) })
        .catch((e) => { res.status(401).json({ status: false,message: 'Kullanıcı kayıt edilemedi' }) })
}

module.exports = {
    post_signup
}