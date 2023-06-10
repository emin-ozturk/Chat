const router = require('express').Router()
const userController = require('../controllers/userController')

router.get('/current-user-id', userController.get_current_user_id)

module.exports = router