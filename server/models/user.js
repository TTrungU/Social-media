const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        maxlength: 20,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        minLength: 6,
        required: true
    }
})


module.exports = mongoose.model('User', userSchema)