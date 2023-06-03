const router = require('express').Router()
const messageController = require('../controllers/messageController')

router.get('/', messageController.get_message)
router.post('/create-message', messageController.post_create_message)

module.exports = router