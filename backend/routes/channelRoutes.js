const router = require('express').Router()
const channelController = require('../controllers/channelController')

router.get('/', channelController.get_channel)
router.post('/create-channel', channelController.post_create_channel)

module.exports = router