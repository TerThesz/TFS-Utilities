const Discord = require("discord.js")
const mongoose = require('mongoose');
const dotEnv = require('dotenv').config();

mongoose.connect('mongodb://TFS-Utilities:4ZkDIIpHZXBTWItg@tfs-utilities-shard-00-00.ljali.mongodb.net:27017,tfs-utilities-shard-00-01.ljali.mongodb.net:27017,tfs-utilities-shard-00-02.ljali.mongodb.net:27017/UserData?ssl=true&replicaSet=atlas-kw31y7-shard-0&authSource=admin&retryWrites=true&w=majority', {
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
                const exampleEmbed = new Discord.MessageEmbed()
                .setColor('BLUE')
                .setDescription(`Používateľ \`${user.username}\` nemá žiaden aktívny predmet.`)
                message.channel.send(exampleEmbed);
            } else {
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
            }
        });
    }
}

module.exports.config = {
    name: "active",
    accessableby: "Members",
    aliases: []
}