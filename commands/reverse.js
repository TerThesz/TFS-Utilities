module.exports.run = async (bot, message, arguments) => {
    message.channel.send("No u", {files: ['https://imgur.com/gLQsjUH.png']}).then(message.delete());
}

module.exports.config = {
    name: "reverse",
    description: "",
    usage: "!reverse",
    accessableby: "Members",
    aliases: []
}