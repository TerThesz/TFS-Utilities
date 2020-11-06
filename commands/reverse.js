module.exports.run = async (bot, message, arguments) => {
    message.channel.send("No u", {files: ['https://imgur.com/gallery/4QHyBk0.png']});
}

module.exports.config = {
    name: "reverse",
    description: "",
    usage: "!reverse",
    accessableby: "Members",
    aliases: []
}