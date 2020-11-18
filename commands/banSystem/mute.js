const Discord = require('discord.js');
const muted = new Set();

module.exports.run = async (bot, message, args) => {
    let user = message.mentions.members.first();
    if (!user) return message.channel.send('Tohoto človeka nepoznám');

    if(!message.member.hasPermission('MANAGE_MESSAGES') || !message.member.hasPermission('ADMINISTRATOR')
    || user.hasPermission('MANAGE_MESSAGES') || user.hasPermission('ADMINISTRATOR')) 
        return message.channel.send("Haha ňemožeš!");

    if (muted.has(user.id)) return message.channel.send('Používateľ už je umlčaný.');

    user = user.user;
    if (args.length === 1) {
        let mutedRole = message.guild.roles.cache.find(role => role.name === '↬ Mute');
        message.guild.members.cache.find(member => member.id === user.id).roles.add(mutedRole);
        message.channel.send("Používateľ " + user.username + " bol umlčaný.");
    } else if (args.length > 1) {
        let time = 0;
        args.forEach(arg => {
            switch (arg[arg.length - 1]) {
                case 's':
                    time += parseInt(arg, 10);
                    break;
                case 'm':
                    time += (parseInt(arg, 10) * 60);
                    break;
                case 'h':
                    time += (parseInt(arg, 10) * 60 * 60);
                    break;
            }
        });

        let mutedRole = message.guild.roles.cache.find(role => role.name === '↬ Mute');
        message.guild.members.cache.find(member => member.id === user.id).roles.add(mutedRole);
        message.channel.send("Používateľ " + user.username + " bol umlčaný na " + time + ' sekúnd.');

        console.log(time + '\n\n' + args);

        muted.add(user.id);
        setTimeout(() => {
            if (muted.has(user.id)) {
                message.guild.members.cache.find(member => member.id === user.id).roles.remove( message.guild.roles.cache.find(role => role.name === '↬ Mute'));
                muted.delete(user.id);
                message.guild.members.cache.find(user => user.id === user.id).send('Tvoj mute ti vypršal.');
            }
        }, time * 1000);
    } else return message.channel.send('Zlý počet argumentov');
}

module.exports.config = {
    name: "mute",
    description: "",
    usage: "!mute",
    accessableby: "Admins",
    aliases: []
}

module.exports.unmute = (user, message) => {
    muted.delete(user.id);
    message.guild.members.cache.find(member => member.id === user.id).roles.remove( message.guild.roles.cache.find(role => role.name === '↬ Mute'));
    message.guild.members.cache.find(user => user.id === user.id).send('Tvoj mute ti vypršal.');
}