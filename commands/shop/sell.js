const Discord = require("discord.js")
const mongoose = require('mongoose');
const shopJson = require('../../dataSets/shop.json');

mongoose.connect(require('../../dataSets/bot.json').mongoose, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Data = require('../../models/data.js');

module.exports.run = async (bot, message, args) => {
    const category = shopJson.find(cat => cat.title === args[0]);
    if (!category) return message.channel.send('Takýto predmet neexistuje.');

    Data.findOne({
        userID: message.author.id
    }, (err, data) => {
        if (err) return err;

        if (!data) {
            var createTable = require('../../createTable');
            createTable.create(message.author.username, message.author.id);
        }

        var hasItem = false;
        data.inventory.forEach(item => {
            if (item === category.title) hasItem = true;
        });
        if (!hasItem) return message.channel.send('Tento predmet nevlastníš.');

        data.balance += (category.cost / 100) * 80;
        data.inventory.splice(data.inventory.indexOf(args[0]), 1);
        data.save().catch(err => console.log(err));

        return message.channel.send(new Discord.MessageEmbed()
        .setColor('GREEN')
        .setDescription(`Používateľ **${message.author.username}** práve predal: **${args[0]}**\nza 80% pôvodnej ceny (${(category.cost / 100) * 80})`))
    });
}

module.exports.config = {
    name: "sell",
    accessableby: "Members",
    aliases: []
}