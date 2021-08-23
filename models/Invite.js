const mongoose = require('mongoose');

const inivekeys = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    by: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

const invite = mongoose.model('invitekeys', inivekeys);

module.exports = invite;