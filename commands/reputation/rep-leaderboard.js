const Discord = require("discord.js")
const mongoose = require('mongoose');
const dotEnv = require('dotenv').config();

mongoose.connect('mongodb://TFS-Utilities:4ZkDIIpHZXBTWItg@tfs-utilities-shard-00-00.ljali.mongodb.net:27017,tfs-utilities-shard-00-01.ljali.mongodb.net:27017,tfs-utilities-shard-00-02.ljali.mongodb.net:27017/UserData?ssl=true&replicaSet=atlas-kw31y7-shard-0&authSource=admin&retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Data = require('../../models/data.js');

module.exports.run = (bot, message, arguments) => {
    Data.collection.find().sort({balance:-1}).toArray(function(err, result) {
        if (err) throw err;

        const embed = new Discord.MessageEmbed()
        .setTitle('Bal result (result 10)')
        .setColor('GREEN')
        let description;
        var i = 0;
        result.forEach(user => {
            i++;
            if (i <= 10) {
                if (description) description = description + i + '. **' + user.name + '** (' + user.rep + '€)\n' ;
                else description = i + '. **' + user.name + '** (' + user.rep + '€)\n' 
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