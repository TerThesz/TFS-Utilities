module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission('KICK_MEMBERS') || !message.member.hasPermission('ADMINISTRATOR')) 
        message.channel.send("To by si chcel čo?");
    else {
        let bannedMember = message.guild.members.cache.find(mmbr => mmbr.id === message.mentions.members.first().id);
        if(bannedMember){

        try {
            console.log('**' + bannedMember.tag + "** Bol zabanovaný moderátorom: `" + message.sender.user.username + '`');
            message.channel.send ('**' + bannedMember.user.username + "** Bol zabanovaný moderátorom: `" + message.sender.user.username + '`')
        }
            catch(err) {
            console.log(err);
        }
    }
}
}

module.exports.config = {
    name: "ban",
    description: "Zabanuje používateľa",
    usage: "!ban",
    accessableby: "Admins",
    aliases: []
}