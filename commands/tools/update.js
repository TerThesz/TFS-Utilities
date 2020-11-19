const Discord = require("discord.js")
const config = require('../../dataSets/other.json');
const botConfig = require('../../dataSets/bot.json');

module.exports.run = async (bot, message, arguments) => {
    if(!message.member.hasPermission('ADMINISTRATOR')) 
        return message.channel.send("no ❤");

    const string = arguments[0];
    var fs = require('fs')
    , filename = './changelogs/ch' + string + '.txt';
    fs.readFile(filename, 'utf8', function(err, data) {
    if (err) throw err;
    message.guild.channels.cache.find(channel => channel.id === botConfig.changelogsChannel).send('\`ch' + string + '@' + require('../../dataSets/other.json').version + '\`\n\n' + data);
    });
        
    const fileName = './datasets/other.json'

    config.version = arguments[1];
        
    fs.writeFile(fileName, JSON.stringify(config), function writeJSON(err) {
      if (err) return console.log(err);
      console.log(JSON.stringify(config));
      console.log('writing to ' + fileName);
    });
}

module.exports.config = {
    name: "update",
    accessableby: "Members",
    aliases: []
}