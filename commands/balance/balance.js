const Discord = require("discord.js")
const mongoose = require('mongoose');
const dotEnv = require('dotenv').config();

mongoose.connect(require('../../dataSets/bot.json').mongoose, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Data = require('../../models/data.js');

module.exports.run = async (bot, message, args) => {
    var user = message.mentions.users.first() || message.author;
    if (user) {
        Data.findOne ({
            userID: user.id
        },(err, data) => {
            if (err => console.log(err));
    
            const exampleEmbed = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setDescription(`Používateľ \`${user.username}\` má na účte **${data.balance}€**.`)
            message.channel.send(exampleEmbed);
        });
    }
}

module.exports.config = {
    name: "banlance",
    accessableby: "Members",
    aliases: ['bal', 'cash', 'money', 'peniaze']
}