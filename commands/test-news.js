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
        console.log(arguments);
    }
}

module.exports.config = {
    name: "test-news",
    description: "",
    usage: "!test-news",
    accessableby: "Admins",
    aliases: []
}