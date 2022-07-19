const { default: mongoose } = require('mongoose');

const Post = require('../models/post')
const User = require('../models/user')

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "creator",
                    foreignField: "_id",
                    as: "creator_info",
                }
            },
        ])
        res.status(200).json(posts)
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
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await Post.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}
const likePost = async (req, res) => {

}
const commentPost = async (req, res) => {

}

module.exports = {
    createPost, getAllPosts, deletePost
}