const Discord = require("discord.js")
const mongoose = require('mongoose');

mongoose.connect("mongodb://TFS-Utilities:4ZkDIIpHZXBTWItg@tfs-utilities-shard-00-00.ljali.mongodb.net:27017,tfs-utilities-shard-00-01.ljali.mongodb.net:27017,tfs-utilities-shard-00-02.ljali.mongodb.net:27017/UserData?ssl=true&replicaSet=atlas-kw31y7-shard-0&authSource=admin&retryWrites=true&w=majority", {
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
                name: user.username,
                userID: user.id,
                rep: 0,
                messages: 0,
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