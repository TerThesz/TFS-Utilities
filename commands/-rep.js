const Discord = require("discord.js")
const mongoose = require('mongoose');
const talkedRecently = new Set();

mongoose.connect("mongodb://TFS-Utilities:4ZkDIIpHZXBTWItg@tfs-utilities-shard-00-00.ljali.mongodb.net:27017,tfs-utilities-shard-00-01.ljali.mongodb.net:27017,tfs-utilities-shard-00-02.ljali.mongodb.net:27017/TFS-Utils?ssl=true&replicaSet=atlas-kw31y7-shard-0&authSource=admin&retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Data = require('../models/data.js');

module.exports.run = async (bot, message, arguments) => {
    if (talkedRecently.has(message.author.id)) {
        message.channel.send("Tento command má cooldown na 5 minút");
        return;
    } else {
        let user = message.mentions.users.first();
        if (user) {
            if (user != message.author) {   
                Data.findOne({
                    userID: user.id
                }, (err, data) => {
                    if(err) throw err;
                    if(!data) {
                        const newData = new Data({
                            name: user.username,
                            userID: user.id,
                            rep: -5,
                        });
                        newData.save().catch(err => console.log(err));
                        console.log('Created database table for ' + user.username);
                        return message.channel.send(`${user.username} má -5 bodov reputácie.`);
                    } else {
                        data.rep -= 5;
                        data.save().catch(err => console.log(err));
                        return message.channel.send(`${user.username} má ${data.rep} bodov reputácie.`);
                    }
                    talkedRecently.add(message.author.id);
                })
                talkedRecently.add(message.author.id);
                setTimeout(() => {
                  talkedRecently.delete(message.author.id);
                }, 300000);
            } else {
                message.channel.send('Ak chceš poďakovať sám sebe kúp si čokoládu.');
            }
        } else {message.channel.send('Tohoto človeka nepoznám :(')}
    }
}

module.exports.config = {
    name: "-rep",
    description: "",
    usage: "-rep",
    accessableby: "Members",
    aliases: []
}