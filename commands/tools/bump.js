module.exports.run = (bot, message, args) => {
    setTimeout(() => {
        message.guild.members.cache.find(member => member.username === 'TerThesz').send('bump');
    }, 2 * 60 * 60 * 1000);
}

module.exports.config = {
    name: 'bump',
    aliases: []
}