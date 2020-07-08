const jwt = require('jsonwebtoken')
const secretKey = process.env.SECRET

function encode(data) {
    return jwt.sign(data, secretKey)
}

function decode(token) {
    return jwt.verify(token, secretKey)
}

module.exports = {decode, encode}