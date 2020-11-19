module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission('KICK_MEMBERS') || !message.member.hasPermission('ADMINISTRATOR')) 
        message.channel.send("To ti nedovolím >:(");
    else {
        let member = message.guild.members.cache.find(mmbr => mmbr.id === message.mentions.members.first().id);
        if(member) {
            try {
                await member.kick();
                console.log('Kicked member');
                message.channel.send(`${member.user.username} bol vyhodený so servera.`)
            }
            catch(err) {
                console.log(err);
            }
        } 
    }
}

module.exports.config = {
    name: "kick",
    description: "Vyhodí hráča",
    usage: "!kick",
    accessableby: "Admins",
    aliases: []
}