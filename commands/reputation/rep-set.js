const Discord = require("discord.js")
const mongoose = require('mongoose');
const { repRoles } = require('../../dataSets/bot.json');
const talkedRecently = new Set();
const dotEnv = require('dotenv').config();

mongoose.connect(process.env.mongoose, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Data = require('../../models/data.js');

module.exports.run = async (bot, message, arguments) => {
    arguments = message.content.split(' ').slice(1);

    if (!message.member.hasPermission('ADMINISTRATOR')) return;
    if (!arguments[1]) return;
    if (arguments[1] != parseInt(arguments[1], 10)) return;
    let user = message.mentions.members.first() || arguments[0];
    if (user) {
        Data.findOne({
            userID: user.id
        }, (err, data) => {
            if(err) throw err;
                data.rep = arguments[1];
                data.save().catch(err => console.log(err));
                message.channel.send('Rep set to ' + arguments[1]);
        })
    } else {message.channel.send('Tohoto človeka nepoznám :(')}
}

module.exports.config = {
    name: "rep-set",
    description: "",
    usage: "rep-set",
    accessableby: "Admins",
    aliases: []
}