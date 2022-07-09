const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    tags: [String],
    selectedFiles: String,
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