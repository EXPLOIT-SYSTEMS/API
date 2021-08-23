const mongoose = require('mongoose');

const versions = new mongoose.Schema({
    program: {
        type: String,
        required: true
    },
    version: {
        type: String,
        required: true
    }
});

const version = mongoose.model('versions', versions);

module.exports = version;