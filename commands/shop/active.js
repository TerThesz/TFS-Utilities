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

            if (!data) {
                var createTable = require('../../createTable');
                createTable.create(user.username, user.id);
            }
    
                const exampleEmbed = new Discord.MessageEmbed()
                .setColor('BLUE')
                .setTitle('Active ' + user.username)

                let active = '';
                var i = 0;
                data.active.forEach(item => {
                    i++;
                    active = active + i + '- ' + item + '\n'
                });

                message.channel.send(exampleEmbed.setDescription(active));
        });
    }
}

module.exports.config = {
    name: "active",
    accessableby: "Members",
    aliases: ['upgrades']
}