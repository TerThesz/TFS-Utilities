const { MessageAttachment } = require('discord.js');

module.exports.run = async (bot, message, arguments) => {
    message.channel.send('https://tenor.com/view/surprised-pikachu-pokemon-shock-surprised-pikachu-gif-15357817').then(message.delete());
}

module.exports.config = {
    name: "surprised",
    accessableby: "Members",
    aliases: [':O']
}