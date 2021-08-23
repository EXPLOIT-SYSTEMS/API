const mongoose = require('mongoose');

const accs = new mongoose.Schema({
    data: {
        type: String,
    },
    accnumber: {
        type: String,
    }
});

const accounts = mongoose.model('accounts', accs);

module.exports = accounts;