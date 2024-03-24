const json = require('jsonwebtoken')
const { JWT_SECRET } = require('../constant')
const generateToken = async (payload, expiresIn = '1h') => {

    const token = await json.sign(payload, JWT_SECRET, { expiresIn });
    return token;

}

module.exports = {
    generateToken
};