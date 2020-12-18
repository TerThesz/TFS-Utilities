const Discord = require("discord.js")
const mongoose = require('mongoose');
const dotEnv = require('dotenv').config();

mongoose.connect(require('../../dataSets/bot.json').mongoose, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Data = require('../../models/data.js');

module.exports.run = async (bot, message, arguments) => {
    let user = message.mentions.members.first() || message.author;
    if (user != message.author) user = user.user;
    if (user) {
        Data.findOne({
            userID: user.id
        }, (err, data) => {
            if(err) throw err;

            if (!data) {
                var createTable = require('../../createTable');
                createTable.create(user.username, user.id);
            }
            
                var embed = new Discord.MessageEmbed()
                .setTitle('Status hráča ' + user.username)
                .addFields(
                    {name: 'Základné informácie ', value: 'Používateľské meno: **' + user.username + '**\n' 
                        + 'userID: **' + user.id + '**\nPeniaze: **' + data.balance + '€**'},
                    {name: 'Levely ', value: 'Reputácia: **' + data.rep + ' bodov**\nSprávy: **' + data.messages + '**ˢᵖʳᵃᵛ'},
                    {name: 'Herné informácie ', value: 'Steam link: **<' + data.steamLinked + '>**\nOdohraté hry na serveri: **' + data.gamesPlayied + '**'}
                )
                .setColor('BLUE') 
                message.channel.send(embed);
            })
    }
}

module.exports.config = {
    name: "stats",
    accessableby: "Members",
    aliases: []
}