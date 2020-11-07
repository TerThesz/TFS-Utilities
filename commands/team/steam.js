const Discord = require("discord.js")
const mongoose = require('mongoose');

mongoose.connect(process.env.mongoose, {
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
            message.channel.send('Tento používateľ nemá prepojený steam účet \*smutné pesničky\*');
        } else {
            message.channel.send('Link na steam účet používateľa ' + user.username + ': <' + data.steamLinked + '>');
        }
    });
}

module.exports.config = {
    name: "steam",
    accessableby: "Members",
    aliases: []
}