var config = require('../../dataSets/bot.json');
var temporary = [];

module.exports.run = async (bot, message, args) => {
    var author = message.guild.members.cache.find(user => user.id === message.author.id);

    var isInChannel = false;
    switch (args[0]) {
        case 'lock':
            for (var i = 0; i < temporary.length;) {
                if (temporary[i].newID === author.voice.channelID) {
                    if (!temporary.filter(temp => temp.newID === author.voice.channelID)) return message.channel.send('Musíš byť v **mnou vytvorenom** channeli.')
                    if (temporary[i].authorID != author.id && message.guild.members.cache.find(user => user.id === author.id).hasPermission('ADMINISTRATOR')) return message.channel.send('Musíš byť **majiteľ** channelu.')
                    if (temporary[i].locked === true) return message.channel.send('Tento channel už je **uzamknutý**.')

                    isInChannel = true;
                    temporary[i].locked = true;

                    message.guild.channels.cache.find(chan => chan.id === temporary[i].newID)
                    .overwritePermissions([
                        {
                            id: message.guild.roles.everyone.id,
                            deny: [ 'CREATE_INSTANT_INVITE', 'CONNECT', 'SPEAK' ],
                        },
                        {
                            id: temporary[i].authorID,
                            allow: [ 'CREATE_INSTANT_INVITE', 'CONNECT', 'SPEAK' ],
                        },
                    ]);
                    
                    return message.channel.send('Channel bol úspešne **uzamknutý**.')
                }
                i++;
            }
            if (!isInChannel) return message.channel.send('Musíš byť v **mnou vytvorenom** channeli.');
            break;
        case 'unlock':
            for (var i = 0; i < temporary.length;) {
                if (temporary[i].newID === author.voice.channelID) {
                    if (!temporary.filter(temp => temp.newID === author.voice.channelID)) return message.channel.send('Musíš byť v **mnou vytvorenom** channeli.')
                    if (temporary[i].authorID != author.id && !message.guild.members.cache.find(user => user.id === author.id).hasPermission('ADMINISTRATOR')) return message.channel.send('Musíš byť **majiteľ** channelu.')
                    if (temporary[i].locked === false) return message.channel.send('Tento channel už je **odomknutý**.')

                    isInChannel = true;
                    temporary[i].locked = false;

                    message.guild.channels.cache.find(chan => chan.id === temporary[i].newID)
                    .updateOverwrite(message.guild.roles.everyone.id, { 
                        CREATE_INSTANT_INVITE: true,
                        CONNECT: true,
                        SPEAK: true
                    });
                    
                    return message.channel.send('Channel bol úspešne **odomknutý**.')
                }
                i++;
            }
            if (!isInChannel) return message.channel.send('Musíš byť v **mnou vytvorenom** channeli.');
            break;
        case 'allow':
            var allowUser = message.mentions.users.first();
            for (var i = 0; i < temporary.length;) {
                if (temporary[i].newID === author.voice.channelID) {
                    if (!allowUser) return message.channel.send('Musíš **označiť** nejakého človeka');
                    if (!temporary.filter(temp => temp.newID === author.voice.channelID)) return message.channel.send('Musíš byť v **mnou vytvorenom** channeli.')
                    if (temporary[i].authorID != author.id && !message.guild.members.cache.find(user => user.id === author.id).hasPermission('ADMINISTRATOR')) return message.channel.send('Musíš byť **majiteľ** channelu.')
                    if (temporary[i].allowed.find(x => x === allowUser.id)) return message.channel.send('Tento používatel už má **povolený** prístup.')

                    isInChannel = true;

                    message.guild.channels.cache.find(chan => chan.id === temporary[i].newID)
                    .updateOverwrite(allowUser.id, { 
                        CREATE_INSTANT_INVITE: true,
                        CONNECT: true,
                        SPEAK: true
                    });
                    temporary[i].allowed.push(allowUser.id);
                    
                    return message.channel.send('Používatel **' + allowUser.username + '** má povolený prístup do channelu.')
                }
                i++;
            }
            if (!isInChannel) return message.channel.send('Musíš byť v **mnou vytvorenom** channeli.');
            break;
        case 'kick':
            var allowUser = message.mentions.users.first();
            for (var i = 0; i < temporary.length;) {
                if (temporary[i].newID === author.voice.channelID) {
                    if (!allowUser) return message.channel.send('Musíš **označiť** nejakého človeka');
                    if (!temporary.filter(temp => temp.newID === author.voice.channelID)) return message.channel.send('Musíš byť v **mnou vytvorenom** channeli.')
                    if (temporary[i].authorID != author.id && !message.guild.members.cache.find(user => user.id === author.id).hasPermission('ADMINISTRATOR')) return message.channel.send('Musíš byť **majiteľ** channelu.')
                    if (!message.guild.channels.cache.find(chan => chan.id === temporary[i].newID).members.find(x => x.id === allowUser.id)) return message.channel.send('Tento používateľ **nie je** v tvojom channeli.')

                    isInChannel = true;

                    message.guild.channels.cache.find(chan => chan.id === temporary[i].newID)
                    .updateOverwrite(allowUser.id, { 
                        CREATE_INSTANT_INVITE: false,
                        CONNECT: false,
                        SPEAK: false
                    });
                    temporary[i].allowed.splice(temporary[i].allowed.indexOf(allowUser.id), 1);
                    message.guild.members.cache.find(user => user.id === allowUser.id).voice.setChannel(null);
                    
                    return message.channel.send('Používatel **' + allowUser.username + '** bol vyhodený.')
                }
                i++;
            }
            if (!isInChannel) return message.channel.send('Musíš byť v **mnou vytvorenom** channeli.');
            break;
    }
}

module.exports.config = {
    name: "voice",
    accessableby: "Members",
    aliases: ['channel']
}

module.exports.voice = (oldMember, newMember) => {
    var member = newMember.guild.members.cache.find(mmbr => mmbr.id === newMember.id)

    var mainChannel = config.tempChannel;
    var mainCatagory = config.tempCategory;
    var vipMainChannel = config.vipTempChannel;
    var vipMainCatagory = config.vipTempCategory;

    switch (newMember.channelID) {
        case mainChannel:
            newMember.guild.channels.create(`${member.user.username}'s channel`, { type: 'voice', parent: mainCatagory })
                .then(async channel => {
                    temporary.push({ authorID: member.id, newID: channel.id, guild: channel.guild, locked: false, allowed: [] })
                    // A new element has been added to temporary array!
                    await member.voice.setChannel(channel)
                })
            break;
        case vipMainChannel:
            newMember.guild.channels.create(`${member.user.username}'s channel`, { type: 'voice', parent: vipMainCatagory })
                .then(async channel => {

                    temporary.push({ authorID: member.id, newID: channel.id, guild: channel.guild, locked: false, allowed: [] })
                    // A new element has been added to temporary array!
                    await member.voice.setChannel(channel)
                })
            break;
    }

    if (temporary.length >= 0) for (let i = 0; i < temporary.length; i++) {
        // Finding...
        let ch = temporary[i].guild.channels.cache.find(x => x.id == temporary[i].newID)

        if (!ch.members.find(member => member.id === temporary[i].authorID)) {
            ch.delete(1000)
            // Channel has been deleted!
            return temporary.splice(i, 1)
        }
    }
}