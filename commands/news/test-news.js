const Discord = require('discord.js');

module.exports.run = async (bot, message, arguments) => {
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Novinka: Nemas permisie chjechje');

    const embed = new Discord.MessageEmbed()
        .setTitle(arguments[0].replace('-', ' '))
        .setDescription(arguments[1].replace('-', ' '))
        .setColor('ORANGE')

    switch (arguments.length) {
        case 4:
            embed.addField(arguments[2].replace('-', ' '), arguments[3].replace('-', ' '), arguments[4])
            break;
        case 6:
            embed.addField(arguments[5].replace('-', ' '), arguments[6].replace('-', ' '), arguments[7])
            break;
        case 8:
            embed.addField(arguments[8].replace('-', ' '), arguments[9].replace('-', ' '), arguments[10])
            break;
    }

    message.channel.send(embed);
}

module.exports.config = {
    name: "test-news",
    accessableby: "Admins",
    aliases: []
}