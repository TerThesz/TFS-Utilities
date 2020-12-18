const Discord = require("discord.js")
const mongoose = require('mongoose');
const dotEnv = require('dotenv').config();

mongoose.connect(require('../../dataSets/bot.json').mongoose, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Data = require('../../models/data.js');

module.exports.run = async (bot, message, arguments) => {
    var user = message.mentions.members.first() || message.author;

    Data.findOne({
        userID: user.id
    }, (err, data) => {

        if (!data) {
            var createTable = require('../../createTable');
            createTable.create(user.username, user.id);
        }
        
            message.channel.send('Link na steam účet používateľa ' + user.username + ': <' + data.steamLinked + '>');
        });
}

module.exports.config = {
    name: "steam",
    accessableby: "Members",
    aliases: []
}