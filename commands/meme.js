const Discord = require("discord.js");
const bot = new Discord.Client();
const randomPuppy = require('random-puppy');
const snekfetch = require('snekfetch');

module.exports.run = async (client, message, args) => {
    const subReddits = ["memes", "meme", "me_irl", "dankmemes", "dankmeme", "pewdiepiesubmissions", "duklock", "madlad", "mildlyvandalised"]
    const random = subReddits[Math.floor(Math.random() * subReddits.length)];

    message.channel.startTyping();

    randomPuppy(subreddit).then(async url => {
            await message.channel.send({
                files: [{
                    attachment: url,
                    name: 'meme.png'
                }]
            }).then(() => message.channel.stopTyping());
    }).catch(err => console.error(err));
}

module.exports.config = {
    name: "meme",
    description: "",
    usage: "!meme",
    accessableby: "Members",
    aliases: []
}