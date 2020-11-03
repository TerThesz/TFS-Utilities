module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission('ADMINISTRATOR')) 
        message.channel.send("To si vyhoď z hlavy.");
    else {
        for (let arg in args) {
            parseArgs[args] = args[arg];
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