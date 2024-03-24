const express = require('express');
const bodyParser = require('body-parser');
const User = require('./user.model');
const connectDB = require('../database')
const app = express();
app.use(bodyParser.json());

connectDB();

const createUser = async (req, res) => {

    const { username, password } = req.body;

    const newUser = new User({ username, password, status: 'online' });

    await newUser.save();
    res.status(200).json({ message: 'User created successfully' });
}

const findUser = async (username) => {

    const user = await User.findOne({ username });

    if (user) {
        return user
    } else {
        return false;
    }
}

const updateUserStatus = async (username, status) => {
    try {

        const user = await User.findOneAndUpdate({ username }, { status });

        return user;
    } catch (error) {

    }
}

const fetchOnlineUser = async (req, res) => {

    const users = await User.find({ status: 'online' });

    res.status(200).json(users);
}

module.exports = { createUser, findUser, fetchOnlineUser, updateUserStatus };