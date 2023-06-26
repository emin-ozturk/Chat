const router = require('express').Router()
const userController = require('../controllers/userController')

router.get('/current-user', userController.get_current_user)
router.get('/check-user/:userName', userController.get_check_user)

module.exports = router