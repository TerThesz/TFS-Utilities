var Discord = require('discord.js');
var config = require('../../dataSets/bot.json');

module.exports.run = (bot, message, args) => {
    var author = message.author;
    var guildAuthor = message.guild.members.cache.find(member => member.id === author.id);
    var mention = args[0];

    if (!guildAuthor.hasPermission('ADMINISTRATOR') || !guildAuthor.hasPermission('ADMINISTRATOR')) return message.channel.send('No ❤');
    if (!mention) return message.channel.send('Musíš označiť človeka.');

    var embed = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle('Unban ')
        .setDescription(`Používateľ bol úspešne odbanovaný.`);
    
    message.channel.send(embed);

    message.guild.members.unban(mention);
    message.delete();
    }

module.exports.config = {
    name: 'unban',
    aliases: []
}