module.exports.run = async (bot, message, arguments) => {
    message.channel.send("No u", {files: ['../imgs/reverse.png']});
    message.delete();
}

module.exports.config = {
    name: "reverse",
    description: "",
    usage: "!reverse",
    accessableby: "Members",
    aliases: []
}