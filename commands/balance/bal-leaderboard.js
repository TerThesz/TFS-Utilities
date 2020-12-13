const Discord = require("discord.js")
const mongoose = require('mongoose');
const dotEnv = require('dotenv').config();

mongoose.connect(require('../../dataSets/bot.json').mongoose, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Data = require('../../models/data.js');

module.exports.run = (bot, message, arguments) => {
    Data.collection.find().sort({balance:-1}).toArray(function(err, result) {
        if (err) throw err;

        const embed = new Discord.MessageEmbed()
        .setTitle('Balance - Tabuľka (top 10)')
        .setColor('GREEN')
        let description;
        var i = 0;
        result.forEach(user => {
            i++;
            if (i <= 10) {
                if (description) description = description + i + '. **' + user.name + '** (' + user.balance + '€)\n' ;
                else description = i + '. **' + user.name + '** (' + user.balance + '€)\n' 
            }
        });
        embed.setDescription(description);
        message.channel.send(embed);
    });
}

module.exports.config = {
    name: "bal-leaderboard",
    accessableby: "Members",
    aliases: ['bal-top', 'bal-lb', 'balance-top', 'balance-leaderboard', 'balance-lb' ]
}