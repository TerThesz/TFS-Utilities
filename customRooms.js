const config = require('./dataSets/bot.json');

module.exports = (bot) => {
bot.on('voiceStateUpdate', (oldMember, newMember) => {
        let newUserChannel = newMember.voiceChannel
        let oldUserChannel = oldMember.voiceChannel
        
        if(oldUserChannel === undefined && newUserChannel !== undefined) {
            if (newUserChannel.id === config.customChannels.channel) {
                const channel = bot.guild.channels.cache.get(newMember.username);
                if (channel) return newMember.send('Channel s tvojim menom už existuje.');
                console.log('jj');
            }
        }
    })
}