const shopJson = require('../../dataSets/shop.json');
const mongoose = require('mongoose');
const Discord = require("discord.js")

mongoose.connect('mongodb://TFS-Utilities:4ZkDIIpHZXBTWItg@tfs-utilities-shard-00-00.ljali.mongodb.net:27017,tfs-utilities-shard-00-01.ljali.mongodb.net:27017,tfs-utilities-shard-00-02.ljali.mongodb.net:27017/UserData?ssl=true&replicaSet=atlas-kw31y7-shard-0&authSource=admin&retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Data = require('../../models/data.js');

module.exports.run = async (bot, message, args) => {
    const category = shopJson.find(cat => cat.title === args[0]);
    if (!category) return message.channel.send('Haha to ti tak budem veriť určite nemáš ' + args[0]);
    Data.findOne({
        userID: message.author.id
    }, (err,data) => {
        if (err) return err;

        var canContinue = false;
        data.inventory.forEach(item => { if (item.toLocaleLowerCase() === category.title.toLocaleLowerCase()) canContinue = true; });
        if (!canContinue) return message.channel.send('Tento predmet nemáš v inventári.');

        if (category.action === '+p vip') {
            const setRole = message.guild.roles.cache.find(_role => _role.id === '772939303105593345');
            message.member.roles.add(setRole);
    
            return message.channel.send(new Discord.MessageEmbed()
            .setColor('GREEN')
            .setDescription(`Používateľ **${message.author.username}** si aktivoval **VIP**!`));
        } else if (category.action.startsWith('+s')) {
            if (category.itemRequired != 'non') {
                var _canContinue = false;
                data.active.forEach(item => { if (item === category.itemRequired) _canContinue = true; });
                if (!_canContinue) return message.channel.send('Pre túto akciu si potrebuješ zakúpiť a aktivovať: **' + category.itemRequired + '**.')
            }
            var __canContinue = true;
            data.active.forEach(item => { if (item === args[0]) { __canContinue = false } });
            if (!__canContinue) return message.channel.send('Tento predmet už máš aktívny.\nMôžeš ho predať commandom `!sell`');
        
            data.active.push(args[0]);
            data.inventory.splice(data.inventory.indexOf(args[0]), 1);
            data.save().catch(err => console.log(err));

            return message.channel.send(new Discord.MessageEmbed()
            .setColor('GREEN')
            .setDescription(`Používateľ **${message.author.username}** si aktivoval: **${args[0]}**.`));
        }
    });
}

module.exports.config = {
    name: 'use',
    aliases: []
}