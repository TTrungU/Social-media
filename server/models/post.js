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
    comment: {
        type: [{
            commentBy_id: {
                type: mongoose.Types.ObjectId,
                ref: "User",
                required: true
            },
            commentBy_name: {
                type: String,
                required: true
            },
            content: {
                type: String,
                required: true
            }
        }],
        default: [],
    },
    likes: {
        type: [String],
        default: [],
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    selectedFiles: {
        type: String,
        required: true
    },

})
module.exports = mongoose.model("Post", postSchema)