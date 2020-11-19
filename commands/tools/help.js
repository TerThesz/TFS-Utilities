const Discord = require("discord.js")
const helpJson = require('../../dataSets/help.json');

module.exports.run = async (bot, message, arguments) => {
    if (arguments.length === 0) {
        const embed = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTitle('TFS-Utilities Help')
            .setThumbnail(bot.user.avatar_url);
        helpJson.forEach (category => {
            embed.addField(
                category.category,
                category.description,
                true
            )
        });
        message.channel.send(embed);
    } else {
        const category = helpJson.find(ctgr => ctgr.category.toLowerCase() === arguments[0].toLowerCase());
        if (!category) return message.channel.send('Nenašiel som takúto kategóriu');
        const embed = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setTitle('TFS-Utilities Help [' + category.category + ']')
        .setThumbnail(bot.user.avatar_url)
        .setDescription(category.description)

        category.data.forEach(command => {
            embed.addField(
                command.cmd,
                command.description,
            )
        });

        message.channel.send(embed);
    }
}

module.exports.config = {
    name: "help",
    accessableby: "Members",
    aliases: []
}