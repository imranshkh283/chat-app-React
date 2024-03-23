
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const db = await mongoose.connect('mongodb://localhost:27017/ChatWithReact');
        console.log("DB connected to", db.connection.name);
    } catch (error) {
        console.error(error);
    }
};

module.exports = connectDB;