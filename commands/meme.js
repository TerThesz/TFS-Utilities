const Discord = require("discord.js");
const bot = new Discord.Client();
const randomPuppy = require('random-puppy');
const snekfetch = require('snekfetch');

module.exports.run = async (client, message, args) => {
    const subReddits = ["memes", "meme", "me_irl", "dankmemes", "dankmeme", "pewdiepiesubmissions", "duklock", "madlad", "mildlyvandalised"]
    const random = subReddits[Math.floor(Math.random() * subReddits.length)];

    randomPuppy(random).then(url => {
        snekfetch.get(url).then(async res => {
            await message.channel.send({
                files: ({
                    attacment: res.body,
                    name: "prd"
                })
            })
        });
    });
}

module.exports.config = {
    name: "meme",
    description: "",
    usage: "!meme",
    accessableby: "Members",
    aliases: []
}