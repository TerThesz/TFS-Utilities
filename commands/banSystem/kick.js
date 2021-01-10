var Discord = require('discord.js');
var config = require('../../dataSets/bot.json');

module.exports.run = (bot, message, args) => {
    var author = message.author;
    var guildAuthor = message.guild.members.cache.find(member => member.id === author.id);
    var mention = message.mentions.users.first();

    if (!guildAuthor.hasPermission('ADMINISTRATOR') || !guildAuthor.hasPermission('ADMINISTRATOR')) return message.channel.send('No ❤');
    if (!mention) return message.channel.send('Musíš označiť človeka.');

    var guildMention = message.guild.members.cache.find(member => member.id === mention.id);
    if (guildMention.hasPermission('ADMINISTRATOR')) return message.channel.send('Tohoto používateľa nemôžeš kicknúť.');

    var reason = 'non';
    if (args.length > 1) {
        args.shift();
        reason = args.join(' ');
    }

    var embed = new Discord.MessageEmbed()
        .setColor('RED')
        .setTitle('Kick')
        .setDescription(`Používateľ **${mention.username}** bol vyhodený.\nKick dostal od: **${author.username}**\nKick dostal za \`${reason}\``);
    
    message.channel.send(embed);

    guildMention.kick();
    }

module.exports.config = {
    name: 'kick',
    aliases: []
}