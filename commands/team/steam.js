const Discord = require("discord.js")
const mongoose = require('mongoose');

mongoose.connect("mongodb://TFS-Utilities:4ZkDIIpHZXBTWItg@tfs-utilities-shard-00-00.ljali.mongodb.net:27017,tfs-utilities-shard-00-01.ljali.mongodb.net:27017,tfs-utilities-shard-00-02.ljali.mongodb.net:27017/UserData?ssl=true&replicaSet=atlas-kw31y7-shard-0&authSource=admin&retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Data = require('../../models/data.js');

module.exports.run = async (bot, message, arguments) => {
    var user = message.mentions.members.first() || message.author;

    Data.findOne({
        userID: user.id
    }, (err, data) => {
        if (!data) {
            message.channel.send('Tento používateľ nemá prepojený steam účet \*smutné pesničky\*');
        } else {
            message.channel.send('Link na steam účet používateľa ' + user.username + ': <' + data.steamLinked + '>');
        }
    });
}

module.exports.config = {
    name: "steam",
    accessableby: "Members",
    aliases: []
}