module.exports.run = async (bot, message, arguments) => {
    if (message.content === '!prd') {
        message.channel.send('kak');
    }
}

module.exports.config = {
    name: "prd",
    description: "Vymaže daný počet správ",
    usage: "!prd",
    accessableby: "Members",
    aliases: ['c', 'purge']
}