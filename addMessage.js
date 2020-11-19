const Discord = require("discord.js")
const mongoose = require('mongoose');
const { msgRoles } = require('./dataSets/bot.json');

mongoose.connect('mongodb://TFS-Utilities:4ZkDIIpHZXBTWItg@tfs-utilities-shard-00-00.ljali.mongodb.net:27017,tfs-utilities-shard-00-01.ljali.mongodb.net:27017,tfs-utilities-shard-00-02.ljali.mongodb.net:27017/UserData?ssl=true&replicaSet=atlas-kw31y7-shard-0&authSource=admin&retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Data = require('./models/data.js');

module.exports.run = async (bot, message, arguments) => {
    if (message.author.bot) return;
    let user = message.author;

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
            });
            newData.save().catch(err => console.log(err));
            console.log('Created database table for ' + user.username);
        } else {
            const rng = Math.floor(Math.random() * Math.floor(100));
            const money = Math.floor(Math.random() * Math.floor(100));

            if (rng >= 80) data.rep++;
            if (rng >= 50) data.balance += money;

            data.messages += 1;
            data.save().catch(err => console.log(err));

            var sendCongrats = false;
            var role;
            if (data.messages === 100) {
                role = msgRoles.role1;
                sendCongrats = true;
            }
            else if (data.messages === 500) {
                role = msgRoles.role2;
                sendCongrats = true;
            }
            else if (data.messages === 1000) {
                role = msgRoles.role3;
                sendCongrats = true;
            }
            else if (data.messages === 2000) {
                role = msgRoles.role4;
                sendCongrats = true;
            }
            else if (data.messages === 5000) {
                role = msgRoles.role5;
                sendCongrats = true;
            }

            if (sendCongrats) {
                const setRole = message.guild.roles.cache.find(_role => _role.id === role);
                message.guild.members.cache.find(member => member.id === message.author.id).roles.add(setRole);
    
                const exampleEmbed = new Discord.MessageEmbed()
                .setColor('BLUE')
                .setTitle('Blahoželáme!')
                .setDescription(`Používateľ ${user.username} práve napísal svoju ${data.messages}. správu!`);
                message.channel.send(exampleEmbed);
            }
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