const router = require('express').Router()
const signupController = require('../controllers/signupController')

router.post('/', signupController.post_signup)

module.exports = router