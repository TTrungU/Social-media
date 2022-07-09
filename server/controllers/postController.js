const { default: mongoose } = require('mongoose');
const post = require('../models/post');
const Post = require('../models/post')

const getAllPosts = async (req, res) => {
    try {
        const post = await Post.find()
        res.status(200).json(post)
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const editPost = async (req, res) => {
    try {
        const { id } = req.params();
        const post = Post.findById(id)
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
        if (post.creator === id) {
            await PostMessage.findByIdAndUpdate(id, { $set: req.body }, { new: true });

        }
    } catch (error) {
        res.status(500).json(error)
    }

}
const createPost = async (req, res) => {

    const newPost = new Post(req.body)
    console.log(newPost)
    try {
        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
const deletePost = async (req, res) => {

}
const likePost = async (req, res) => {

}
const commentPost = async (req, res) => {

}

module.exports = {
    createPost
}