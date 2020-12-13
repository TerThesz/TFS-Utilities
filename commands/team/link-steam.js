const Discord = require("discord.js")
const mongoose = require('mongoose');
const dotEnv = require('dotenv').config();

mongoose.connect(require('../../dataSets/bot.json').mongoose, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Data = require('../../models/data.js');

module.exports.run = async (bot, message, arguments) => {
    if (arguments[0]) {
        //https://steamcommunity.com/id/terthesz/
        if (arguments[0].startsWith('https://steamcommunity.com/id/') && arguments[0].slice(-1) === '/') {
            var steamUserID = arguments[0].replace('https://steamcommunity.com/id/', '').replace('/', '');
            var user = message.author;

            if (steamUserID.length >= 3 && steamUserID.length <= 32) {
                Data.findOne({
                    userID: user.id
                }, (err, data) => {
                        data.steamLinked = arguments[0];
                        data.save().catch(err => console.log(err));
                        message.channel.send('Linked steam account (<' + arguments[0] + '>)');
                    });
            }
        }
    }
}

module.exports.config = {
    name: "link-steam",
    accessableby: "Members",
    aliases: ['steam-link']
}