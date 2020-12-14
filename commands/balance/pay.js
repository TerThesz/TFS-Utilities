const Discord = require("discord.js")
const mongoose = require('mongoose');
const dotEnv = require('dotenv').config();

mongoose.connect(require('../../dataSets/bot.json').mongoose, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Data = require('../../models/data.js');

module.exports.run = async (bot, message, args) => {
    var sender = message.author;
    var reciever = message.mentions.users.first();
    var amout = args[1];
    if (sender && reciever) {
        if (amout > 0) {
            Data.findOne ({
                userID: sender.id
            },(err, data) => {
                if (err => console.log(err));

                if (data.balance >= amout) {
                    Data.findOne ({
                        userID: reciever.id
                    }, (err, data2) => {
                        if (err => console.log(err));

                        var bal = parseInt(amout);
                        data2.balance += (bal);
                        data2.save().catch(err => console.log(err));
                        data.balance -= amout;
                        data.save().catch(err => console.log(err));
                        const exampleEmbed = new Discord.MessageEmbed()
                        .setColor('GREEN')
                        .setDescription(`Používateľ **${sender.username}** úspešne poslal **${amout}€** používaeľovi **${reciever.username}**.`)
                        message.channel.send(exampleEmbed);
                    });
                } else {

                }
            });
        } else {
            return message.channel.send('Fúha neviem či je legálne poslať sa');
        }
    } else {
        return message.channel.send('Daj viac ako nulu pls');
    }
}

module.exports.config = {
    name: "pay",
    accessableby: "Members",
    aliases: ['pay', 'send']
}