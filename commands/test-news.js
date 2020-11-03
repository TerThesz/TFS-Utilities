const co = require("co");

module.exports.run = async (bot, message, args) => {
    console.log(1);
    if(!message.member.hasPermission('ADMINISTRATOR')) 
        message.channel.send("To si vyhoď z hlavy.");
    else {
        console.log(args);
        for (let arg in args) {
            console.log(arg);
        }
    }
}

module.exports.config = {
    name: "test-news",
    description: "",
    usage: "!test-news",
    accessableby: "Admins",
    aliases: []
}