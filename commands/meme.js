const Discord = require("discord.js");
const bot = new Discord.Client();
const api = require("imageapi.js");

module.exports.run = async (client, message, args) => {
    const subReddits = ["memes", "me_irl", "dankmemes", "pewdiepiesubmissions", "duklock", "madlad", "mildlyvandalised"]
    const random = subReddits[Math.floor(Math.random() * subReddits.length)];
    let img = await api(random)
    const Embed = new Discord.MessageEmbed()
    .setTitle(`A meme from r/arabfunny`)
    .setURL(`https://www.reddit.com/r/arabfunny`)
    .setColor('RANDOM')
    .setImage(img)
    message.channel.send(Embed)
}

module.exports.config = {
    name: "meme",
    description: "",
    usage: "!meme",
    accessableby: "Members",
    aliases: []
}