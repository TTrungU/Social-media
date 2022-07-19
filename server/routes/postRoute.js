const express = require('express');
const router = express.Router()
const { createPost, getAllPosts, deletePost } = require('../controllers/postController')


router.post('/create', createPost)
router.get('/', getAllPosts)
router.delete('/:id', deletePost)



module.exports = router