const router = require('express').Router()
const channelController = require('../controllers/channelController')

router.get('/', channelController.get_channel)
router.get('/channel-users', channelController.get_channel_users)
router.post('/create-channel', channelController.post_create_channel)
router.post('/insert-user', channelController.post_insert_user)
router.post('/leave-channel', channelController.post_leave_channel)

module.exports = router