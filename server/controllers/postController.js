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

// const getPost = async (req, res) => {
//     const { id } = req.params;

//     try {
//         const post = await Post.findById(id);

//         res.status(200).json(post);
//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }
// }

const getPost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Post.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(id)
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "creator",
                    foreignField: "_id",
                    pipeline: [
                        {
                            $project: {
                                _id: 0, password: 0
                            }
                        },
                    ],
                    as: "creator_info"
                },
            },
        ])

        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


const editPost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, message, creator, selectedFile, tags } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

        const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

        await Post.findByIdAndUpdate(id, updatedPost, { new: true });

        res.json(updatedPost);

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
    const { id } = req.params;
    console.log(req.user.id)
    if (!req.user.id) {
        return res.json({ message: "Unauthenticated" });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    const post = await Post.findById(id);
    const index = post.likes.findIndex((id) => id === String(req.user.id));
    if (index === -1) {
        post.likes.push(req.user.id);
    } else {
        post.likes = post.likes.filter((id) => id !== String(req.user.id));
    }

    const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });

    res.status(200).json(updatedPost);
}

const commentPost = async (req, res) => {

    try {

        const { id } = req.params;
        const { commentBy_id, content, commentBy_name } = req.body;
        console.log(commentBy_id, commentBy_name, content)
        const post = await Post.findById(id);
        post.comment.push({ commentBy_id, commentBy_name, content })
        const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });
        res.json(updatedPost);
    } catch (error) {
        console.log(error)
    }
}

const deleteComment = async (req, res) => {
    try {
        const { id } = req.params
        const { commentId } = req.body
        const post = await Post.findById(id);
        post.comment.forEach((item, index) => {
            if (item._id == commentId) {
                post.comment.splice(index, 1)
            }
        })
        const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });
        res.json(updatedPost)
    } catch (error) {
        console.log(error)
    }
}

const searchPost = async (req, res) => {
    const { searchQuery } = req.query;
    try {
        // console.log(searchQuery)
        const title = new RegExp(searchQuery, "i");

        const posts = await Post.find({ title });

        res.json(posts);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getPostsByCreator = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    try {
        const posts = await Post.aggregate([
            {
                $match: {
                    creator: new mongoose.Types.ObjectId(id)
                }
            },
        ]);

        res.json(posts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
module.exports = {
    createPost,
    getAllPosts,
    deletePost,
    getPost,
    commentPost,
    deleteComment,
    searchPost,
    getPostsByCreator,
    editPost,
    likePost,
}