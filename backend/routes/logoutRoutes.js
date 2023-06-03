const router = require('express').Router()
const logoutController = require('../controllers/logoutController')

router.get('/', logoutController.get_logout)

module.exports = router