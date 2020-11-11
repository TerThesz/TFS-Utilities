const Discord = require("discord.js")
const mongoose = require('mongoose');
const { repRoles } = require('../../dataSets/bot.json');
const talkedRecently = new Set();

mongoose.connect(process.env.mongoose, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Data = require('../../models/data.js');

module.exports.run = async (bot, message, arguments) => {
    arguments = message.content.split(' ').slice(1);

    if (!message.member.hasPermission('ADMINISTRATOR')) return;
    if (!arguments[1]) return;
    if (arguments[1] != parseInt(arguments[1], 10)) return;
    let user = message.mentions.members.first() || arguments[0];
    if (user) {
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
                    balance: -arguments[1],
                    steamLinked: 'null',
                    gamesPlayied: 0,
                    pending: 'null',
                });
                data = newData;
                newData.save().catch(err => console.log(err));
                console.log('Created database table for ' + user.username);
                message.channel.send('Removed ' + arguments[1] + ' bal');
            } else {
                var bal = parseInt(arguments[1]);
                data.balance -= bal;
                data.save().catch(err => console.log(err));
                message.channel.send('Removed ' + arguments[1] + ' bal');
            }
        })
    } else {message.channel.send('Tohoto človeka nepoznám :(')}
}

module.exports.config = {
    name: "eco-remove",
    description: "",
    usage: "eco-remove",
    accessableby: "Admins",
    aliases: []
}