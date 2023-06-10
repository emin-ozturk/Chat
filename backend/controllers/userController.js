const { currentUserID } = require('../middlewares/authMiddleWares')
const User = require('../models/user')

const get_current_user_id = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const userID = await currentUserID(token)
    res.json({ 'currentUserID': userID })
}

module.exports = {
    get_current_user_id
}