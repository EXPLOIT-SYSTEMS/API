const mongoose = require('mongoose');

const license = new mongoose.Schema({
    program: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    }
});

const lisions = mongoose.model('licenses', license);

module.exports = lisions;