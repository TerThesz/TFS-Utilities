const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    let member = message.mentions.members.first();
    if(!message.member.hasPermission('MANAGE_MESSAGES') && !member.user.hasPermission('ADMINISTRATOR')) {
        message.channel.send("Haha ňemožeš!");
    } else {
        let mutedRole = member.guild.roles.cache.find(role => role.name === '↬ Mute');
        member.roles.add(mutedRole);
        message.channel.send("Používateľ bol umlčaný.");
    }
}

module.exports.config = {
    name: "mute",
    description: "",
    usage: "!mute",
    accessableby: "Admins",
    aliases: []
}