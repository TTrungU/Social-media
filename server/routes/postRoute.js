const express = require('express');
const router = express.Router()
const middleware = require('../middleware/middleware');
const { createPost, getAllPosts, deletePost, getPost, commentPost, deleteComment, searchPost, getPostsByCreator, editPost, likePost } = require('../controllers/postController')


router.post('/create', createPost)
router.get('/', getAllPosts)
router.get('/search', searchPost);
router.get('/:id', getPost)
router.post('/:id/comment', commentPost)
router.get('/creator/:id', getPostsByCreator)

router.post('/:id/deleteComment', middleware, deleteComment)
router.patch('/:id', middleware, editPost)
router.delete('/:id', middleware, deletePost)
router.patch('/:id/likePost', middleware, likePost);



module.exports = router