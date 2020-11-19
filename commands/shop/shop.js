const Discord = require("discord.js")
const mongoose = require('mongoose');
const shopJson = require('../../dataSets/shop.json');
const dotEnv = require('dotenv');

mongoose.connect('mongodb://TFS-Utilities:4ZkDIIpHZXBTWItg@tfs-utilities-shard-00-00.ljali.mongodb.net:27017,tfs-utilities-shard-00-01.ljali.mongodb.net:27017,tfs-utilities-shard-00-02.ljali.mongodb.net:27017/UserData?ssl=true&replicaSet=atlas-kw31y7-shard-0&authSource=admin&retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Data = require('../../models/data.js');

module.exports.run = async (bot, message, args) => {
    var objects = [];
    shopJson.forEach(data => {
        objects.push(JSON.parse(JSON.stringify(data)));
    })
    if (args.length === 0) {
        const shopEmbed = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setTitle('TFS - Shop')
        .setDescription('Na nákup použi command !buy <názov>');

        objects.forEach(object => {
            shopEmbed.addField(
                object.title + '  (**' + object.cost + '€**)',
                object.description
            );
        }); 

        message.channel.send(shopEmbed);
    } else {
        var object = objects.find(data => data.title === args[0]);
        if (!object) return message.channel.send('Takýto predmet som nenašiel :(');

        Data.findOne ({
            userID: message.author.id
        }, (err, data) => {
            if (err => console.log(err));

            if (!data) {
                const newData = new Data({
                    active: [],
                    name: message.author.username,
                    userID: message.author.id,
                    rep: 0,
                    messages: 0,
                    balance: 0,
                    steamLinked: 'null',
                    gamesPlayied: 0,
                    pending: 'null',
                    inventory: [],
                });
                return message.channel.send('Nemáš na to lóve (Pls nechoď robiť drogy ok pls ok)');
            } else {
                if (data.balance >= object.cost) {
                    data.balance -= object.cost;
                    const inv = data.inventory;
                    inv.push(object.title);
                    data.inventory = inv;
                    data.save().catch(err => console.log(err));
                    const exampleEmbed = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setDescription(`Používateľ **${message.author.username}** si zakúpil predmet: **${object.title}**!!`)
                    message.channel.send(exampleEmbed);
                } else return message.channel.send('Nemáš na to lóve (Pls nechoď robiť drogy ok pls ok)');
            }
        });
    }
}

module.exports.config = {
    name: "shop",
    accessableby: "Members",
    aliases: ['buy']
}