const get_logout = (req, res) => {
    res.cookie('chatCookie', '', {maxAge: 1})
    res.json({ status: true})
}

module.exports = {
    get_logout
}