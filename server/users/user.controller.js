const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const User = require('./user.model');
const connectDB = require('../database')
const app = express();
app.use(bodyParser.json());

connectDB();

const createUser = async (req, res) => {

    const { username, password } = req.body;

    const newUser = new User({ username, password });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
}

module.exports = { createUser };