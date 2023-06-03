const router = require('express').Router()
const singupController = require('../controllers/singupController')

router.post('/', singupController.post_singup)

module.exports = router