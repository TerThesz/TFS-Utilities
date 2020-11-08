const Discord = require("discord.js")
const mongoose = require('mongoose');

mongoose.connect(process.env.mongoose, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Data = require('../../models/data.js');

module.exports.run = async (bot, message, args) => {
    var user = message.mentions.members.first().user || message.author;
    if (user) {
        Data.findOne ({
            userID: user.id
        },(err, data) => {
            if (err => console.log(err));
    
            if(!data) {
                const newData = new Data({
                    name: user.username,
                    userID: user.id,
                    rep: 0,
                    messages: 0,
                    balance: 0,
                    steamLinked: 'null',
                    gamesPlayied: 0,
                    pending: 'null',
                });
                newData.save().catch(err => console.log(err));
                const exampleEmbed = new Discord.MessageEmbed()
                .setColor('BLUE')
                .setDescription(`Používateľ \`${user.username}\` má na účte **0€**.`)
                message.channel.send(exampleEmbed);
            } else {
                const exampleEmbed = new Discord.MessageEmbed()
                .setColor('BLUE')
                .setDescription(`Používateľ \`${user.username}\` má na účte **${data.balance}€**.`)
                message.channel.send(exampleEmbed);
            }
        });
    }
}

module.exports.config = {
    name: "banlance",
    accessableby: "Members",
    aliases: ['bal', 'cash', 'money', 'peniaze']
}