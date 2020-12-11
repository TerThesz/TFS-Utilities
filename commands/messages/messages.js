const Discord = require("discord.js")
const mongoose = require('mongoose');
const { msgRoles } = require('../../dataSets/bot.json');
const dotEnv = require('dotenv').config();

mongoose.connect(process.env.mongoose, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Data = require('../../models/data.js');

module.exports.run = async (bot, message, arguments) => {
    let user = message.mentions.users.first() || message.author;

    Data.findOne({
        userID: user.id
    }, (err, data) => {
        if(err) throw err;

            const exampleEmbed = new Discord.MessageEmbed();
            if (data.messages === 1) {
                exampleEmbed
                .setColor('BLUE')
                .setDescription(`Používateľ ${user.username} má ${data.messages} správu.`);
            } else if (data.messages > 1 && data.messages < 5) {
                exampleEmbed
                .setColor('BLUE')
                .setDescription(`Používateľ ${user.username} má ${data.messages} správy.`);
            } else {
                exampleEmbed
                .setColor('BLUE')
                .setDescription(`Používateľ ${user.username} má ${data.messages} správ.`);
            }
            message.channel.send(exampleEmbed);
        })
}
module.exports.config = {
    name: "messages",
    accessableby: "Members",
    aliases: ['msgs']
}