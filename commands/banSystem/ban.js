var Discord = require('discord.js');
var config = require('../../dataSets/bot.json');

module.exports.run = (bot, message, args) => {
    var author = message.author;
    var guildAuthor = message.guild.members.cache.find(member => member.id === author.id);
    var mention = message.mentions.users.first();

    if (!guildAuthor.hasPermission('ADMINISTRATOR') || !guildAuthor.hasPermission('ADMINISTRATOR')) return message.channel.send('No ❤');
    if (!mention) return message.channel.send('Musíš označiť človeka.');

    var guildMention = message.guild.members.cache.find(member => member.id === mention.id);
    if (guildMention.hasPermission('ADMINISTRATOR')) return message.channel.send('Tohoto používateľa nemôžeš bannúť.');

    var reason = 'non';
    if (args.length > 1) {
        args.shift();
        reason = args.join(' ');
    }

    var _id = '';
    for (var i = 0; i < 5 - config.banID.toString().length;) {
        _id += '0'
        i++
    }
    id = `#${_id}${config.banID}`;

    var embed = new Discord.MessageEmbed()
        .setColor('RED')
        .setTitle('Ban ' + id)
        .setDescription(`Používateľ **${mention.username}** bol zabanovaný.\nBan dostal od: **${author.username}**\nBan dostal za \`${reason}\``);
    
    message.channel.send(embed);

    config.banID += 1;

    const fs = require('fs');
    let fileName = 'dataSets/bot.json';
    let file = config;
        
    file.key = "banID";
        
    fs.writeFile(fileName, JSON.stringify(file, null, 2), function writeJSON(err) {
    if (err) return console.log(err);
    });

    message.guild.members.ban(mention);
    message.delete();
    }

module.exports.config = {
    name: 'ban',
    aliases: []
}