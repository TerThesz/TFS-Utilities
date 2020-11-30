const config = require('./dataSets/bot.json');

module.exports = (bot, guild) => {
    console.log('1');
bot.on('voiceStateUpdate', (oldMember, newMember) => {
    oldMember = guild.users.cache.find(user => user.id === oldMember);
    newMember = guild.users.cache.find(user => user.id === newMember);

    console.log('2');
        let newUserChannel = newMember.voice.channel;
        let oldUserChannel = oldMember.voice.channel;
        console.log(newUserChannel + '\n' + newMember.user + '\n' + oldUserChannel + '\n' + oldMember.user);
        
        console.log('3');
        if(oldUserChannel === undefined && newUserChannel !== undefined) {
            console.log('4');
            if (newUserChannel.id === config.customChannels.channel) {
                console.log('5');
                const channel = guild.channels.cache.get(newMember.username);
                if (channel) return newMember.send('Channel s tvojim menom už existuje.');
                console.log('jj');
            }
        }
    })
}