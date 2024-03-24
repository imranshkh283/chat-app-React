const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['online', 'offline'],
        default: 'offline',
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;