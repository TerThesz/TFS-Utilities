const Discord = require("discord.js")
const mongoose = require('mongoose');

mongoose.connect(process.env.mongoose, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Data = require('../../models/data.js');

module.exports.run = async (bot, message, args) => {
    var sender = message.author;
    var reciever = message.mentions.users.first();
    var amout = args[1];
    if (sender && reciever) {
        if (amout > 0) {
            Data.findOne ({
                userID: sender.id
            },(err, data) => {
                if (err => console.log(err));
        
                if(!data) {
                    message.channel.send('Nemáš židne peniaze.')
                } else {
                    if (data.balance >= amout) {
                        Data.findOne ({
                            userID: reciever.id
                        }, (err, data2) => {
                            if (err => console.log(err));

                            if (!data2) {
                                const newData = new Data({
                                    name: user.username,
                                    userID: user.id,
                                    rep: 0,
                                    messages: 0,
                                    balance: amout,
                                    steamLinked: 'null',
                                    gamesPlayied: 0,
                                    pending: 'null',
                                });
                            } else {
                                var bal = parseInt(amout);
                                data2.balance += (bal);
                                data2.save().catch(err => console.log(err));
                            }
                            data.balance -= amout;
                            data.save().catch(err => console.log(err));
                            const exampleEmbed = new Discord.MessageEmbed()
                            .setColor('GREEN')
                            .setDescription(`Používateľ **${sender.username}** úspešne poslal **${amout}€** používaeľovi **${reciever.username}**.`)
                            message.channel.send(exampleEmbed);
                        });
                    } else {

                    }
                }
            });
        }
    }
}

module.exports.config = {
    name: "pay",
    accessableby: "Members",
    aliases: ['pay', 'send']
}