const router = require('express').Router()
const loginController = require('../controllers/loginController')

router.post('/', loginController.post_login)

module.exports = router