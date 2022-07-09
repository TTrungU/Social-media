const express = require('express');
const router = express.Router()
const { resgisterUser, loginUser } = require('../controllers/authController')

router.post('/signup', resgisterUser)
router.post('/signin', loginUser)

module.exports = router