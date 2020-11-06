const Discord = require('discord.js');
const got = require('got');
const { memesChannel } = require('../../bot.json');

module.exports.run = async (bot, message, args) => {
    const channel = message.guild.channels.cache.find(channel => channel.name === memesChannel)
    if (message.channel != channel) {
        message.channel.send('V tomto prostredí nie je dostatok vibu. (Presuň sa do <#' + channel.id + '>)');
    } else {
        const subReddits = ["memes", "me_irl", "dankmemes", "pewdiepiesubmissions", "duklock", "madlad", "mildlyvandalised"]
        const random = subReddits[Math.floor(Math.random() * subReddits.length)];
        console.log(random);
    
        const embed = new Discord.MessageEmbed();
        got('https://www.reddit.com/r/' + random + '/random/.json?sort=top&t=week').then(response => {
            let content = JSON.parse(response.body);
            let permalink = content[0].data.children[0].data.permalink;
            let memeUrl = `https://reddit.com${permalink}`;
            let memeImage = content[0].data.children[0].data.url;
            let memeTitle = content[0].data.children[0].data.title;
            let memeUpvotes = content[0].data.children[0].data.ups;
            let memeNumComments = content[0].data.children[0].data.num_comments;
            embed.setTitle(`${memeTitle}`);
            embed.setURL(`${memeUrl}`)
            embed.setColor('RANDOM')
            embed.setImage(memeImage);
            embed.setFooter(`👍 ${memeUpvotes} 💬 ${memeNumComments}\n\nFrom r/${random}`);
            message.channel.send(embed)
        }).catch(console.error);
    }
}

module.exports.config = {
    name: "meme",
    aliases: []
}