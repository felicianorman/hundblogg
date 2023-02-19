const mongoose = require('mongoose');
const userRoles = require('../constants/user')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        minLenght: 2,
        maxLenght: 20
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLenght: 6
    },
    role: {
        type: String,
        enum: Object.values(userRoles),
        default: userRoles.USER
    }
})

module.exports = mongoose.model('User', userSchema)