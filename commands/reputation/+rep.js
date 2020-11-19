const Discord = require("discord.js")
const mongoose = require('mongoose');
const { repRoles } = require('../../dataSets/bot.json');
const talkedRecently = new Set();
const dotEnv = require('dotenv').config();

mongoose.connect('mongodb://TFS-Utilities:4ZkDIIpHZXBTWItg@tfs-utilities-shard-00-00.ljali.mongodb.net:27017,tfs-utilities-shard-00-01.ljali.mongodb.net:27017,tfs-utilities-shard-00-02.ljali.mongodb.net:27017/UserData?ssl=true&replicaSet=atlas-kw31y7-shard-0&authSource=admin&retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Data = require('../../models/data.js');

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
                            rep: 5,
                            messages: 0,
                            balance: 0,
                            steamLinked: 'null',
                            gamesPlayied: 0,
                            pending: 'null',
                            inventory: [],
                            active: [],
                        });
                        data = newData;
                        newData.save().catch(err => console.log(err));
                        console.log('Created database table for ' + user.username);
                        const exampleEmbed = new Discord.MessageEmbed()
                        .setColor('#73df57')
                        .setDescription(`Používateľovi \`${user.username}\` sa zväčšila reputácia o **5 bodov**\nMomentálne má **5 bodov** reputácie.`)
                        message.channel.send(exampleEmbed);
                    } else {
                        data.rep += 5;
                        data.save().catch(err => console.log(err));
                        const exampleEmbed = new Discord.MessageEmbed()
                        .setColor('#73df57')
                        .setDescription(`Používateľovi \`${user.username}\` sa zväčšila reputácia o **5 bodov**\nMomentálne má **${data.rep} bodov** reputácie.`)
                        message.channel.send(exampleEmbed);
                    }
                    checkRole(message.guild.members.cache.find(member => member.id === user.id), data.rep, message);
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

function checkRole(user, rep, message) {
    var role;
    if(rep >= 0 && rep <= 5) role = repRoles.role1;
    else if(rep >= 10 && rep <= 15) role = repRoles.role2;
    else if(rep >= 20 && rep <= 45) role = repRoles.role3;
    else if(rep >= 50 && rep <= 75) role = repRoles.role4;
    else if(rep >= 80 && rep <= 100) role = repRoles.role5;
    else if(rep > 100) role =  repRoles.role6;
    const setRole = message.guild.roles.cache.find(_role => _role.id === role);
    user.roles.add(setRole);
}

module.exports.config = {
    name: "+rep",
    description: "",
    usage: "+rep",
    accessableby: "Members",
    aliases: []
}