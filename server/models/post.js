const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    tags: [String],
    selectedFiles: {
        type: String,
        required: true
    },
    comment: {
        type: [String],
        default: [],
    },
    likes: {
        type: [String],
        default: [],
    },
    createdAt: {
        type: Date,
        default: new Date(),
    }

})
module.exports = mongoose.model("Post", postSchema)