const bcrypt = require('bcrypt')
const { default: mongoose } = require('mongoose');
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
        if (user) {
            const token = jwt.sign({ email: user.email, id: user._id }, "test", { expiresIn: "24h" });
            const { password, ...others } = user._doc
            res.status(200).json({ ...others, token })
        }


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
            const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, "test", { expiresIn: "24h" });
            const { password, ...others } = oldUser._doc
            res.status(200).json({ ...others, token })
        }

    } catch (error) {
        res.status(500).json(error);
    }

}

const getUser = async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findById(id)
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);
        const { password, ...others } = user._doc
        res.status(200).json(others)
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
const getAllUsers = async (req, res) => {

    try {
        const users = await User.find()

        const newUsers = users.map((user) => {
            const { password, ...others } = user._doc
            return others
        })
        // console.log(...others)
        res.status(200).json(newUsers)
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

module.exports = { resgisterUser, loginUser, getUser, getAllUsers }