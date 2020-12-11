const Discord = require("discord.js")
const mongoose = require('mongoose');
const { msgRoles } = require('./dataSets/bot.json');
const canGainRep = new Set();

mongoose.connect(process.env.mongoose, {
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
                active: [],
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
            const rng = Math.floor(Math.random() * Math.floor(1000));
            const money = Math.floor(Math.random() * Math.floor(30));


            if (!canGainRep.has(user.id)) {
                canGainRep.add(user.id);
                setTimeout(() => {
                    canGainRep.delete(user.id);
                }, 10 * 60 * 1000);
            }
            message.channel.send(rng);
            if (rng >= (1000 - 750)) data.balance += money;

            data.messages += 1;

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

                data.rep += 5;

                var role;
                var msgs = data.messages += 5;
                if(msgs >= 100 && msgs < 500) role = msgRoles.role1;
                else if(msgs >= 500 && msgs < 1000) role = msgRoles.role2;
                else if(msgs >= 1000 && msgs < 2000) role = msgRoles.role3;
                else if(msgs >= 2000 && msgs < 5000) role = msgRoles.role4;
                else if(msgs >= 5000) role = msgRoles.role5;
                const _setRole = message.guild.roles.cache.find(_role => _role.id === role);
                message.member.roles.add(_setRole);
            }
            data.save().catch(err => console.log(err));
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