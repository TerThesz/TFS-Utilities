module.exports.run = async (bot, message, arguments) => {
    message.delete().then(message.channel.send("No u", {files: ['../imgs/reverse.png']}));
}

module.exports.config = {
    name: "reverse",
    description: "",
    usage: "!reverse",
    accessableby: "Members",
    aliases: []
}