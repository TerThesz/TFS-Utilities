const config = require('./dataSets/bot.json');

module.exports = (bot) => {
    console.log('1');
bot.on('voiceStateUpdate', (oldMember, newMember) => {
    console.log('2');
        let newUserChannel = newMember.voiceChannel
        let oldUserChannel = oldMember.voiceChannel
        
        console.log('3');
        if(oldUserChannel === undefined && newUserChannel !== undefined) {
            console.log('4');
            if (newUserChannel.id === config.customChannels.channel) {
                console.log('5');
                const channel = bot.guild.channels.cache.get(newMember.username);
                if (channel) return newMember.send('Channel s tvojim menom už existuje.');
                console.log('jj');
            }
        }
    })
}