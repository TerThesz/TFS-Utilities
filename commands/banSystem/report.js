var cooldown = new Set();
var config = require('../../dataSets/bot.json');
var Discord = require('discord.js');

module.exports.run = (bot, message, args) => {
    var author = message.author;
    var reported = message.mentions.users.first();

    if (cooldown.has(author.id)) return message.channel.send('Tento command môžeš použiť raz za 1 minútu.');
    if (!reported) return message.channel.send('Musíš označiť človeka.');
    if (args.length < 2) return message.channel.send('šak ale čo zrobil?');

    var channel = message.guild.channels.cache.find(channel => channel.id === config.reportChannel);

    var _id = '';
    for (var i = 0; i < 5 - config.reportID.toString().length;) {
        _id += '0'
        i++
    }
    id = `#${_id}${config.reportID}`;

    args.shift();

    var embed = new Discord.MessageEmbed()
        .setTitle(`Report ${id}`)
        .setDescription(`**Sender:** \`${author.username}\`\n**Reported User:** \`${reported.username}\`\n**Reason:** \`${args.join(" ")}\``)
        .setColor('RED');

    channel.send(embed);

    var authorEmbed = new Discord.MessageEmbed()
        .setTitle(`Report ${id}`)
        .setDescription(`Úspešne si reportol používateľa **${reported.username}** za \`${args.join(" ")}\`.\nBudeme sa to snžiť vyriešiť čo najskôr ako to pôjde.`)
        .setColor('GREEN');

    author.send(authorEmbed);

    config.reportID += 1;

    const fs = require('fs');
    let fileName = 'dataSets/bot.json';
    let file = config;
        
    file.key = "reportID";
        
    fs.writeFile(fileName, JSON.stringify(file, null, 2), function writeJSON(err) {
    if (err) return console.log(err);
    });

    message.delete();

    cooldown.add(author.id);
    setTimeout(() => {
      cooldown.delete(author.id);
    }, 60 * 1000);
}

module.exports.config = {
    name: 'report',
    aliases: []
}