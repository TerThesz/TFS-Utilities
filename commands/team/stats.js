const Discord = require("discord.js")
const mongoose = require('mongoose');
const dotEnv = require('dotenv').config();

mongoose.connect(process.env.mongoose, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Data = require('../../models/data.js');

module.exports.run = async (bot, message, arguments) => {
    let user = message.mentions.members.first() || message.guild.members.cache.find(user => user.username === arguments[0]) || message.author;
    user = user.user;
    if (user) {
        Data.findOne({
            userID: user.id
        }, (err, data) => {
            if(err) throw err;
            if(!data) {
                const newData = new Data({
                    active: [],
                    name: user.username,
                    userID: user.id,
                    rep: 0,
                    messages: 0,
                    balance: 0,
                    steamLinked: 'null',
                    gamesPlayied: 0,
                    pending: 'null',
                    inventory: [],
                });
                newData.save().catch(err => console.log(err));
                var embed = new Discord.MessageEmbed()
                .setTitle('Status hráča ' + user.username)
                .addFields(
                    {name: 'Základné informácie ', value: 'Používateľské meno: **' + user.username + '**\n' 
                        + 'userID: **' + user.id + '**\nPeniaze: 0€'},
                    {name: 'Levely ', value: 'Reputácia: **5 bodov**\nSprávy: **0ˢᵖʳᵃᵛ**'},
                    {name: 'Herné informácie ', value: 'Steam link: **null**\nOdohraté hry na serveri: **0**'}
                )
                .setColor('BLUE')
                message.channel.send(embed);
            } else {
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
            }
        })
    }
}

module.exports.config = {
    name: "stats",
    accessableby: "Members",
    aliases: []
}