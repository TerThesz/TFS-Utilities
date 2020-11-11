const Discord = require("discord.js")
const mongoose = require('mongoose');
const pending = new Set();
const playedRecently = new Set();
const client = new Discord.Client();

mongoose.connect(process.env.mongoose, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Data = require('../../models/data.js');

module.exports.run = async (bot, message, arguments) => {
    var user = message.mentions.members.first();
    if (!user) return;
    if (!pending.has(user.id)) {
        if (user && arguments[1]) {
            var embed = new Discord.MessageEmbed()
                .setTitle('Pozvánka do hry.')
                .setDescription('Pozval si používateľa: **<@' + user.id + '>** do hry: **' + arguments[1] + '**.')
                .setColor('BLUE')
                .setThumbnail(user.displayAvatarURL)
                .addField('Informácie', 'Ak sa o používateľovy chceš dozvedieť viac použi command `!stats <meno>` na serveri TFS.')
            message.author.send(embed);
            var embed2 = new Discord.MessageEmbed()
                .setTitle('Pozvánka do hry.')
                .setDescription('Používateľ: **<@' + message.member.id + '>** ťa pozval do hry: **' + arguments[1] + '**.')
                .setColor('BLUE')
                .setThumbnail(user.displayAvatarURL)
                .addField('Informácie', 'Ak sa o používateľovy chceš dozvedieť viac použi command `!stats <meno>` na serveri TFS.')
                .addField('Prijatie & Odmietnutie', 'Ak pozvánku prijímaš napíš `accept` alebo `potvrdiť`.\nAk pozvánku odmietaš napíš `decline` alebo `odmietnuť`\n(Pozvánka platí jednú minútu)')
            user.send(embed2);
            var infoEmbed = new Discord.MessageEmbed()
                .setDescription()
                .setDescription('Používateľ `' + message.sender.username + '` pozval hráča `' + user.username + '` do hry **' + arguments[1] + '**')
                .setColor('BLUE');
            message.channel.send(infoEmbed);

            Data.findOne({
                userID: user.id
            }, (err, data) => {
                if(err) throw err;
                if(!data) {
                    const newData = new Data({
                        name: user.user.username,
                        userID: user.id,
                        rep: 0,
                        messages: 0,
                        balance: 0,
                        steamLinked: 'null',
                        gamesPlayied: 0,
                        pending: message.author.id,
                    });
                    newData.save().catch(err => console.log(err));
                } else {
                    data.pending = message.author.id;
                    data.save().catch(err => console.log(err));
                }
            });

            pending.add(user.id);
            setTimeout(() => {
                pending.delete(user.id);
                Data.findOne({
                    userID: user.id
                }, (err, data) => {
                    if(err) throw err;
                    if(!data) {
                        const newData = new Data({
                            name: user.user.username,
                            userID: user.id,
                            rep: 0,
                            messages: 0,
                            balance: 0,
                            steamLinked: 'null',
                            gamesPlayied: 0,
                            pending: 'null',
                        });
                        newData.save().catch(err => console.log(err));
                    } else {
                        data.pending = 'null';
                        data.save().catch(err => console.log(err));
                    }
                });
                var embed = new Discord.MessageEmbed()
                .setTitle('Pozvánka do hry vypršala.')
                .setDescription('Pozvánka do hry **' + arguments[1] + '** vypršala.')
                .setColor('RED')
                .setThumbnail(user.displayAvatarURL)
                message.author.send(embed);
                var embed2 = new Discord.MessageEmbed()
                .setTitle('Pozvánka do hry vypršala.')
                .setDescription('Pozvánka do hry **' + arguments[1] + '** vypršala.')
                .setColor('RED')
                .setThumbnail(user.displayAvatarURL)
                user.send(embed2);
            }, 60000);
        }
    }
    bot.on('message', message => {
        if (pending.has(message.author.id) && message.channel.type === "dm") {
            if (message.content.toLowerCase() === 'accept' || message.content.toLowerCase() === 'potvrdiť') {
                Data.findOne({
                    userID: user.id
                }, (err, data) => {
                    if(err) throw err;
                    if(!data) {
                        user.send('Niečo sa pokazilo.');
                    } else {
                        var player = user.guild.members.cache.find(member => member.id === data.pending);
                        if (player) {
                            var embed = new Discord.MessageEmbed()
                            .setTitle('Pozvánka prijatá!')
                            .setDescription('Prijal si pozvánku a za používanie našeho systému si dostal nejaken ten cash.')
                            .setColor('GREEN')
                            .addField('Hodnotenie hry', 'Ak sa ti s používateľom **<@' + user.id + '>** hrá dobre môžeš mu pridať reputáciu pomocou commandu `+rep <meno>` alebo mu ju naopak môžeš odobrať commandom\n `-rep <meno>` (commandy fungujú iba na serveri)')
                            user.send(embed);
                            var embed2 = new Discord.MessageEmbed()
                            .setTitle('Pozvánka prijatá!')
                            .setDescription('Používateľ prijal tvoju pozvánku!')
                            .setColor('GREEN')
                            .addField('Hodnotenie hry', 'Ak sa ti s používateľom **<@' + user.id + '>** hrá dobre môžeš mu pridať reputáciu pomocou commandu `+rep <meno>` alebo mu ju naopak môžeš odobrať commandom\n `-rep <meno>` (commandy fungujú iba na serveri)');
                            player.send(embed2);

                            add(user, player);
    
                            pending.delete(user.id);
                            Data.findOne({
                                userID: user.id
                            }, (err, data) => {
                                data.pending = 'null';
                                data.save().catch(err => console.log(err));
                            });
                        }
                    }
                });
            } else if (message.content.toLowerCase() === 'decline' || message.content.toLowerCase() === 'zamietnuť') {
                Data.findOne({
                    userID: user.id
                }, (err, data) => {
                    if(err) throw err;
                    if(!data) {
                        user.send('Niečo sa pokazilo.');
                    } else {
                        var player = user.guild.members.cache.find(member => member.id === data.pending);
                        if (player) {
                            var embed = new Discord.MessageEmbed()
                            .setTitle('Pozvánka zamietnutá!')
                            .setDescription('Zamietol si pozvánku.')
                            .setColor('RED')
                            user.send(embed);
                            var embed2 = new Discord.MessageEmbed()
                            .setTitle('Pozvánka zamietnutá!')
                            .setDescription('Používateľ zamietol tvoju pozvánku.')
                            .setColor('RED')
                            player.send(embed2);
    
                            pending.delete(user.id);
                            Data.findOne({
                                userID: user.id
                            }, (err, data) => {
                                data.pending = 'null';
                                data.save().catch(err => console.log(err));
                            });
                        }
                    }
                });
            }
        }
    });
    function add (user, player) {
        if (!playedRecently.has(user.id)) {
            Data.findOne({
                userID: user.id
            }, (err, data) => {
                if(err) throw err;
                if(!data) {
                    const newData = new Data({
                        name:user.user.username,
                        userID: user.id,
                        rep: 0,
                        messages: 0,
                        balance: 100,
                        steamLinked: 'null',
                        gamesPlayied: 1,
                        pending: 'null',
                    });
                    newData.save().catch(err => console.log(err));
                } else {
                    data.balance += 100;
                    data.gamesPlayied += 1;
                    data.save().catch(err => console.log(err));
                }
            });
            playedRecently.add(user.id);
            setTimeout(() => {
                playedRecently.delete(user.id);
            }, 3600000);
        }
        if (!playedRecently.has(player.id)) {
            Data.findOne({
                userID: player.id
            }, (err, data) => {
                if(err) throw err;
                if(!data) {
                    const newData = new Data({
                        name: player.user.username,
                        userID: player.id,
                        rep: 0,
                        messages: 0,
                        balance: 100,
                        steamLinked: 'null',
                        gamesPlayied: 1,
                        pending: 'null',
                    });
                    newData.save().catch(err => console.log(err));
                } else {
                    data.balance += 100;
                    data.gamesPlayied += 1;
                    data.save().catch(err => console.log(err));
                }
            });
            playedRecently.add(player.id);
            setTimeout(() => {
                playedRecently.delete(player.id);
            }, 3600000);
        }
    }
}

module.exports.config = {
    name: "play",
    accessableby: "Members",
    aliases: ['invite']
}

/*
                talkedRecently.add(message.author.id);
                setTimeout(() => {
                  talkedRecently.delete(message.author.id);
                }, 300000);

                talkedRecently.has(message.author.id)

                const talkedRecently = new Set();

*/