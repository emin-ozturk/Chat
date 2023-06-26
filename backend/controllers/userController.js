const { currentUserID } = require('../middlewares/authMiddleWares')
const User = require('../models/user')

const get_current_user = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const userID = await currentUserID(token)
    const user = await User.findById(userID)
    res.json({ 'currentUser': user })
}

const get_check_user = async (req, res) => {
    const { userName } = req.params
    const user = await User.findOne({ username: userName })
        .select('name surname')
    res.json(user)
}

module.exports = {
    get_check_user,
    get_current_user
}