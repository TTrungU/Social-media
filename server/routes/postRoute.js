const express = require('express');
const router = express.Router()
const middleware = require('../middleware/middleware');
const { createPost, getAllPosts, deletePost, getPost, commentPost, deleteComment, searchPost, getPostsByCreator, editPost } = require('../controllers/postController')


router.post('/create', createPost)
router.get('/', getAllPosts)
router.get('/search', searchPost);
router.delete('/:id', middleware, deletePost)
router.get('/:id', getPost)
router.post('/:id/comment', commentPost)
router.post('/:id/deleteComment', deleteComment)
router.get('/creator/:id', getPostsByCreator)
router.patch('/:id', editPost)



module.exports = router