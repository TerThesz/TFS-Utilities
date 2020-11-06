const { MessageAttachment } = require('discord.js');

module.exports.run = async (bot, message, arguments) => {
    const attachment = new MessageAttachment('https://imgur.com/gLQsjUH.png');
    message.channel.send(attachment).then(message.delete());
}

module.exports.config = {
    name: "reverse",
    description: "",
    usage: "!reverse",
    accessableby: "Members",
    aliases: []
}