const Discord = require("discord.js")

module.exports.run = async (bot, message, arguments) => {
    message.channel.send('Momentálne bežím na verzií \`' + require('../../dataSets/version.json').version + '\`');
}

module.exports.config = {
    name: "version",
    accessableby: "Members",
    aliases: ['v']
}