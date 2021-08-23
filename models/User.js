const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    rank: {
        type: String,
        default: "User"
    },
    banned: {
        type: Boolean,
        default: false
    },
    usedKey: {
        type: String,
        required: true
    },
    invitedBy: {
        type: String,
        required: true
    },
    points: {
        type: Number,
        default: 200
    },
    token: {
        type: String,
        required: true
    },
    giveaway: {
        type: Boolean,
        default: false
    },
    hwid: {
        type: String,
        default: "none"
    },
    ip: {
        type: String,
        default: "none"
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Users', UserSchema);