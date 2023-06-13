const router = require('express').Router()
const messageController = require('../controllers/messageController')

router.get('/:channelID', messageController.get_message)

module.exports = router