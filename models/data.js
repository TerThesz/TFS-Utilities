const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
    guildID: String,
    guildName: String,
    warns: Array,
    config: Array,
    shop: Array,
    rules: Array,
    blacklist: Array,
    userData: {
        default: {
            name: String,
            userID: String,
            rep: Number,
            messages: Number,
            balance: Number,
            steamLinked: String,
            gamesPlayied: Number,
            pending: String,
            inventory: Array,
            active: Array,
        },
        type: Array,
    }
});

module.exports = mongoose.model('Data', dataSchema);