const { all } = require('bluebird');
const Discord = require('discord.js');
const snekfetch = require('snekfetch');

module.exports.run = async (bot, message, args) => {
    const subReddits = ["memes", "me_irl", "dankmemes", "pewdiepiesubmissions", "duklock", "madlad", "mildlyvandalised"]
    const random = subReddits[Math.floor(Math.random() * subReddits.length)];
    console.log(random);
    try {
        console.log(1);
        const { body } = await snekfetch
            .get(`https://www.reddit.com/r/${random}.json?sort=top&t=week`)
            .query({ limit: 800 });
        const allowed = message.channel.nsfw ? body.data.children : body.data.children.filter(post => !post.data.over_18);
        console.log(allowed);
        if (!allowed.length) return message.channel.send('It seems we are out of fresh memes!, Try again later.');
        const randomnumber = Math.floor(Math.random() * allowed.length)
        const embed = new Discord.RichEmbed()
        .setColor(0x00A2E8)
        .setTitle(allowed[randomnumber].data.title)
        .setDescription("Posted by: " + allowed[randomnumber].data.author)
        .setImage(allowed[randomnumber].data.url)
        .addField("Other info:", "Up votes: " + allowed[randomnumber].data.ups + " / Comments: " + allowed[randomnumber].data.num_comments)
        .setFooter("Memes provided by r/dankmemes")
        message.channel.send(embed)
        console.log(2);
    } catch (err) {
        console.log(3);
        return console.log(err);
    }

}

module.exports.config = {
    name: "meme",
    description: "",
    usage: "!meme",
    accessableby: "Members",
    aliases: []
}