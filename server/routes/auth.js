const express = require('express');
const router = express.Router()
const { resgisterUser, loginUser, getUser, getAllUsers } = require('../controllers/authController')

router.post('/signup', resgisterUser)
router.post('/signin', loginUser)
router.get('/:id', getUser)
router.get('/', getAllUsers)

module.exports = router