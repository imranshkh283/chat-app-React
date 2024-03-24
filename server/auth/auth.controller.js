const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('../users/user.model');
const { findUser, updateUserStatus } = require('../users/user.controller');
const { generateToken } = require('./token');

const app = express();
app.use(bodyParser.json());


const login = async (req, res) => {
    const { username, password } = req.body;

    const user = await findUser(username);

    if (user) {
        if (user.password === password) {
            // generate token
            const payload = {
                id: user._id,
                username: user.username,
            };

            await User.findByIdAndUpdate(user._id, { status: 'online' });

            const token = await generateToken(payload);

            res.status(200).json({ token: token, message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    }
}

const logout = async (req, res) => {

    const { userId } = req.body;

    const user = await User.findById(userId);

    if (user) {

        await User.findByIdAndUpdate(userId, { status: 'offline' });

        res.status(200).json({ message: 'Logout successful' });

    } else {

    }
}


module.exports = { login, logout };