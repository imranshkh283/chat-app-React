const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('../users/user.model');
const { findUser } = require('../users/user.controller');
const { generateToken } = require('./token');

const app = express();
app.use(bodyParser.json());


const login = async (req, res) => {
    const { username, password } = req.body

    const user = await findUser(username);

    if (user) {
        if (user.password === password) {
            // generate token
            const payload = {
                id: user._id,
                username: user.username,
            };
            const token = await generateToken(payload);
            res.status(200).json({ token: token, message: 'Login successful' });
        } else {

            res.status(401).json({ message: 'Invalid credentials' });
        }
    }
}

module.exports = { login };