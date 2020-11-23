const Discord = require("discord.js")
const mongoose = require('mongoose');
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
            console.log('Created database table for ' + user.username);
            const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#73df57')
            .setDescription(`Používateľ \`${user.username}\` má **0 bodov** reputácie.`)
            return message.channel.send(exampleEmbed);;
        } else {
            const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#73df57')
            .setDescription(`Používateľ \`${user.username}\` má **${data.rep} bodov** reputácie.`)
            return message.channel.send(exampleEmbed);;
        }
    })
}

module.exports.config = {
    name: "rep",
    description: "",
    usage: "rep",
    accessableby: "Members",
    aliases: []
}