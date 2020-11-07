const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
    name: String,
    userID: String,
    rep: Number,
    messages: Number,
    balance: Number,
    steamLinked: String,
    gamesPlayied: Number,
    pending: String,
});

module.exports = mongoose.model('Data', dataSchema);