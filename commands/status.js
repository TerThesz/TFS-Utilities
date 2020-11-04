const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args, client) => {
    if(!message.member.hasPermission('ADMINISTRATOR')) 
        message.channel.send("Status set to: Ňemožes XDDD :|");
    else {
        if (args.length < 2)
            message.channel.send("Malo argumentov pls pridaj");
        else {
            var statusType = args[0];
            fs.writeFile("../bot.json", JSON.stringify(statusType, null, 4), err => {
                if(err) console.log(err)
            });
            var statusText = args[1].replace('-', ' ');
            fs.writeFile("../bot.json", JSON.stringify(statusText, null, 4), err => {
                if(err) console.log(err)
            });
            client.user.setActivity(statusText, { type: statusType });
        }
    }
}

module.exports.config = {
    name: "status",
    description: "",
    usage: "!status",
    accessableby: "Admins",
    aliases: []
}