const Discord = require('discord.js');
const mongoose = require('mongoose');

mongoose.connect(require('./dataSets/bot.json').mongoose, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Data = require('./models/data.js');

module.exports.create = (username, id) => {
    const newData = new Data({
        active: [],
        name: username,
        userID: id,
        rep: 0,
        messages: 0,
        balance: 0,
        steamLinked: 'null',
        gamesPlayied: 0,
        pending: 'null',
        inventory: [],
    });
    newData.save().catch(err => console.log(err));
    console.log('Created database table for ' + username);
}