module.exports.run = async (bot, message, args, num) => {
    var intNum = parseInt(num, 10);
    console.log(intNum + '\n' + num)
    try {message.channel.send(require('../../dataSets/pravidlá.json')[intNum - 1])}
    catch (e) { console.log(e) };
}

module.exports.config = {
    name: 'pravidla',
    aliases: []
}