module.exports.run = async (bot, message, args) => {
    console.log(message.content);
    console.log(args);
    if(!message.member.hasPermission('ADMINISTRATOR')) 
        message.channel.send("To si vyhoď z hlavy.");
    else {
        const regex = new RegExp('"[^"]+"|[\\S]+', 'g');
        const arguments = [];
        args.match(regex).forEach(element => {
            if (!element) return;
            return arguments.push(element.replace(/"/g, ''));
        });
        switch(args.length) {
            case 6:
                const exampleEmbed = new Discord.MessageEmbed()
                .setColor('#15902567')
                .setTitle(args[0])
                .setAuthor(message.sender.user.username, message.sender.user.avatar)
                .setDescription(args[1])
                .addFields(
                    { name: args[2].split('|')[0], value: args[2].split('|')[1] },
                    { name: args[3].split('|')[0], value: args[3].split('|')[1] },
                    { name: args[4].split('|')[0], value: args[4].split('|')[1] },
                    { name: args[5].split('|')[0], value: args[5].split('|')[1] },
                )
                .setTimestamp()
                .setFooter('Novinky');
                break;
            case 5:
                const exampleEmbed = new Discord.MessageEmbed()
                .setColor('#15902567')
                .setTitle(args[0])
                .setAuthor(message.sender.user.username, message.sender.user.avatar)
                .setDescription(args[1])
                .addFields(
                    { name: args[2].split('|')[0], value: args[2].split('|')[1] },
                    { name: args[3].split('|')[0], value: args[3].split('|')[1] },
                    { name: args[4].split('|')[0], value: args[4].split('|')[1] },
                )
                .setTimestamp()
                .setFooter('Novinky');
                break;
            case 4:
                const exampleEmbed = new Discord.MessageEmbed()
                .setColor('#15902567')
                .setTitle(args[0])
                .setAuthor(message.sender.user.username, message.sender.user.avatar)
                .setDescription(args[1])
                .addFields(
                    { name: args[2].split('|')[0], value: args[2].split('|')[1] },
                    { name: args[3].split('|')[0], value: args[3].split('|')[1] },
                )
                .setTimestamp()
                .setFooter('Novinky');
                break;
            case 3:
                const exampleEmbed = new Discord.MessageEmbed()
                .setColor('#15902567')
                .setTitle(args[0])
                .setAuthor(message.sender.user.username, message.sender.user.avatar)
                .setDescription(args[1])
                .addFields(
                    { name: args[2].split('|')[0], value: args[2].split('|')[1] },
                )
                .setTimestamp()
                .setFooter('Novinky');
                break;
            case 2:
                const exampleEmbed = new Discord.MessageEmbed()
                .setColor('#15902567')
                .setTitle(args[0])
                .setAuthor(message.sender.user.username, message.sender.user.avatar)
                .setDescription(args[1])
                .setTimestamp()
                .setFooter('Novinky');
                break;
            case 1:
                const exampleEmbed = new Discord.MessageEmbed()
                .setColor('#15902567')
                .setTitle(args[0])
                .setAuthor(message.sender.user.username, message.sender.user.avatar)
                .setTimestamp()
                .setFooter('Novinky');
                break;
            default:
                message.channel.send('Nepoužitelný počet argumentov. (očakávaný poČet argumentov 1-6)');
                break;
                
        }

        channel.send(exampleEmbed);
    }
}

module.exports.config = {
    name: "test-news",
    description: "",
    usage: "!test-news",
    accessableby: "Admins",
    aliases: []
}