const router = require('express').Router()
const channelController = require('../controllers/channelController')

router.get('/', channelController.get_channel)
router.post('/create-channel', channelController.post_create_channel)
router.post('/insert-user', channelController.post_insert_user)

module.exports = router