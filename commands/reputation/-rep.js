const Discord = require("discord.js")
const mongoose = require('mongoose');
const { repRoles } = require('../../dataSets/bot.json');
const talkedRecently = new Set();
const dotEnv = require('dotenv').config();

mongoose.connect(require('../../dataSets/bot.json').mongoose, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Data = require('../../models/data.js');

module.exports.run = (bot, message, arguments) => {
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

                    if (!data) {
                        var createTable = require('../../createTable');
                        createTable.create(user.username, user.id);
                    }

                        data.rep -= 5;
                        data.save().catch(err => console.log(err));
                        const exampleEmbed = new Discord.MessageEmbed()
                        .setColor('#d52d31')
                        .setDescription(`Používateľovi \`${user.username}\` sa znížila reputácia o **5 bodov**\nMomentálne má **${data.rep} bodov** reputácie.`)
                        message.channel.send(exampleEmbed);
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
    if(rep < 105 && rep > 80) role =  repRoles.role6;
    else if(rep < 80 && rep > 50) role = repRoles.role5;
    else if(rep < 50 && rep > 20) role = repRoles.role4;
    else if(rep < 20 && rep > 10) role = repRoles.role3;
    else if(rep < 10 && rep > 0) role = repRoles.role2;
    else if(rep < 0) role = repRoles.role1;
    const setRole = message.guild.roles.cache.find(_role => _role.id === role);
    user.roles.remove(setRole);
}

module.exports.config = {
    name: "-rep",
    description: "",
    usage: "-rep",
    accessableby: "Members",
    aliases: []
}