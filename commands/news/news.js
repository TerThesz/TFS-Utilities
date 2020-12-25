const Discord = require('discord.js');

module.exports.run = async (bot, message, arguments) => {
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Novinka: Nemas permisie chjechje');
    console.log(1);

    const embed = new Discord.MessageEmbed()
        .setTitle(replaceAll(arguments[0], '-', ' '))
        .setDescription(replaceAll(arguments[1], '-', ' '))
        .setColor('ORANGE')
        console.log(2);

    if (arguments.length >= 5)
        embed.addField(replaceAll(arguments[2], '-', ' '), replaceAll(arguments[3], '-', ' '), arguments[4])
    if (arguments.length >= 8)
        embed.addField(replaceAll(arguments[5], '-', ' '), replaceAll(arguments[6], '-', ' '), arguments[7])
    if (arguments.length >= 11)
        embed.addField(replaceAll(arguments[8], '-', ' '), replaceAll(arguments[9], '-', ' '), arguments[10])

        console.log(3);
        console.log(embed);

    message.guild.channels.cache.find(channel => channel.id === config.newsChannel).send(embed);
    message.guild.channels.cache.find(channel => channel.id === config.newsChannel).send('<@&772938668310528010>');
    console.log(4);

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