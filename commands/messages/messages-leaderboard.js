const Discord = require("discord.js")
const mongoose = require('mongoose');
const dotEnv = require('dotenv').config();

mongoose.connect(require('../../dataSets/bot.json').mongoose, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Data = require('../../models/data.js');

module.exports.run = (bot, message, arguments) => {
    Data.collection.find().sort({messages:-1}).toArray(function(err, result) {
        if (err) throw err;

        const embed = new Discord.MessageEmbed()
        .setTitle('Správy - Tabuľka (top 10)')
        .setColor('GREEN')
        let description;
        var i = 0;
        result.forEach(user => {
            i++;
            if (i <= 10) {
                if (description) description = description + i + '. **' + user.name + '** (' + user.messages + 'ˢᵖʳᵃᵛ)\n' ;
                else description = i + '. **' + user.name + '** (' + user.messages + 'ˢᵖʳᵃᵛ)\n' 
            }
        });
        embed.setDescription(description);
        message.channel.send(embed);
    });
}

module.exports.config = {
    name: "messages-leaderboard",
    accessableby: "Members",
    aliases: ['messages-top', 'messages-lb', 'msgs-top', 'msgs-leaderboard', 'msgs-lb' ]
}