const Discord = require("discord.js")
const mongoose = require('mongoose');
const shopJson = require('../../dataSets/shop.json');
const dotEnv = require('dotenv');

mongoose.connect(process.env.mongoose, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Data = require('../../models/data.js');

module.exports.run = async (bot, message, args) => {
    const user = message.mentions.users.first() || message.author;
    var objects = [];
    shopJson.forEach(data => {
        objects.push(JSON.parse(JSON.stringify(data)));
    })

    Data.findOne ({
        userID: user.id
    }, (err, data) => {
        if (err => console.log(err));

        if (!data) {
            const newData = new Data({
                active: [],
                name: user.username,
                userID: user.id,
                rep: 0,
                messages: 0,
                balance: 0,
                steamLinked: 'null',
                gamesPlayied: 0,
                pending: 'null',
                inventory: [],
            });
            return message.channel.send('Sorrko ale tvoj inventár je prázdny');
        } else {
            let items = [];
            data.inventory.forEach(item => {
                items.push(item);
            })
            const embed = new Discord.MessageEmbed()
                .setColor('BLUE')
            let description = 'Inventár Hráča **' + user.username + '**\n';
            var i = 0;
            items.forEach(item => {
                i++;
                description = description + '\n' + i + '- ' + item;
            })
            embed.setDescription(description);
            message.channel.send(embed)
        }
    });
}

module.exports.config = {
    name: "inv",
    accessableby: "Members",
    aliases: ['inventory']
}