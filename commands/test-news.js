const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission('ADMINISTRATOR')) 
        message.channel.send("To si vyhoď z hlavy.");
    else {
        const regex = new RegExp('"[^"]+"|[\\S]+', 'g');
        const arguments = [];
        args.match(regex).forEach(element => {
            if (!element) return;
            return arguments.push(element.replace(/"/g, ''));
        });
        const e0 = new Discord.MessageEmbed()
        .setColor('#15902567')
        .setTitle('úrd')
        .setAuthor(message.sender.user.username, message.sender.user.avatar)
        .setDescription('kak')
        .setTimestamp()
        .setFooter('Novinky');
        message.channel.send(e0);
    }
}

module.exports.config = {
    name: "test-news",
    description: "",
    usage: "!test-news",
    accessableby: "Admins",
    aliases: []
}