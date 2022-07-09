const bcrypt = require('bcrypt')
const { json } = require('body-parser')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()


const resgisterUser = async (req, res) => {
    const { username, email, password } = req.body
    try {
        const oldUser = await User.findOne({ email })
        if (oldUser) return req.status(400).json({ message: "User already exists" })
        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(password, salt)
        const newUser = await new User({
            username: username,
            email: email,
            password: hashed,
        })
        const user = await newUser.save()
        res.status(200).json(user)

    } catch (error) {
        res.status(500).json(error)
    }

}

const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const oldUser = await User.findOne({ email })
        if (!oldUser) return req.status(404).json({ message: 'User dose not exists' })
        const validPassword = await bcrypt.compare(password, oldUser.password)
        if (!validPassword) return req.status(404).json({ message: 'Wrong password' })

        if (oldUser && validPassword) {
            const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, "test", { expiresIn: "1h" });
            const { password, ...others } = oldUser._doc
            res.status(200).json({ ...others, token })
        }

    } catch (error) {
        res.status(500).json(error);
    }

}

module.exports = { resgisterUser, loginUser }