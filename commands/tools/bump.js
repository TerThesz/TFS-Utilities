module.exports.run = (bot, message, args) => {
    setTimeout(() => {
        bot.guilds.cache.find(guild => guild.id === '772916118930063360').members.cache.find(member => member.id === '487639083951194124').send('bump');
    }, 2 * 60 * 60 * 1000);
}

module.exports.config = {
    name: 'bump',
    aliases: []
}