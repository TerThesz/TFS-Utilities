module.exports.run = async (bot, message, args) => {
    console.log(message.content);
    console.log(args);
    if(!message.member.hasPermission('ADMINISTRATOR')) 
        message.channel.send("To si vyhoď z hlavy.");
    else {
    }
}

module.exports.config = {
    name: "test-news",
    description: "",
    usage: "!test-news",
    accessableby: "Admins",
    aliases: []
}