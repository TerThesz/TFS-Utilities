const Discord = require('discord.js');
const config = require('../../dataSets/bot.json');

module.exports.run = async (bot, message, arguments) => {
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Novinka: Nemas permisie chjechje');

    const embed = new Discord.MessageEmbed()
        .setTitle(replaceAll(arguments[0], '-', ' '))
        .setDescription(replaceAll(arguments[1], '-', ' '))
        .setColor('ORANGE')

    switch (arguments.length) {
        case 4:
            embed.addField(replaceAll(arguments[2], '-', ' '), replaceAll(arguments[3], '-', ' '), arguments[4])
            break;
        case 6:
            embed.addField(replaceAll(arguments[5], '-', ' '), replaceAll(arguments[6], '-', ' '), arguments[7])
            break;
        case 8:
            embed.addField(replaceAll(arguments[8], '-', ' '), replaceAll(arguments[9], '-', ' '), arguments[10])
            break;
    }

    message.guild.channels.cache.find(channel => channel.id === config.newsChannel).send(embed);
    message.guild.channels.cache.find(channel => channel.id === config.newsChannel).send('<@&772938668310528010>');

    function replaceAll(string, search, replace) {
        var prd = string.split(search).join(replace);
        return prd.split('\\n').join('\n');
      }

}

module.exports.config = {
    name: "news",
    accessableby: "Admins",
    aliases: []
}