const Discord = require('discord.js');
const config = require('./bot.json');
const { blacklistedWords } = require('./blacklist.json');
const client = new Discord.Client({disableEveryone: true});

const fs = require("fs");

client.on("guildMemberAdd", member => {
    config.joinRoles.forEach(role => {
        member.roles.add(role);
    });
    const welcomeChannel = member.guild.channels.cache.find(channel => channel.name === config.leaveJoinChannel)
    welcomeChannel.send (`**${member.user.username}** sa k nám pripojil!`)
});

client.on("guildMemberRemove", member => {
    const leaveChannel = member.guild.channels.cache.find(channel => channel.name === config.leaveJoinChannel)
    leaveChannel.send (`**${member.user.username}** od nás odišiel :(`)
});

client.on("ready", () =>{
    const activities = [
        `!help - TFS-Utilities`,
        `${client.channels.cache.size} channels!`,
        `${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} users on TFS!`
    ];

    let i = 0;
    setInterval(() => client.user.setActivity(`${activities[i++ % activities.length]}`, { type: 'WATCHING' }), 15000);
    console.log(`Logged in as ${client.user.tag}!`);
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js") 
    if(jsfile.length <= 0) {
         return console.log("[LOGS] Couldn't Find Commands!");
    }

    jsfile.forEach((f, i) => {
        let pull = require(`./commands/${f}`);
        console.log(f + ' loaded!');
        client.commands.set(pull.config.name, pull);  
        pull.config.aliases.forEach(alias => {
            client.aliases.set(alias, pull.config.name)
        });
    });
});

client.on("message", message => {
    if(message.author === client || message.channel.type === "dm") return;
    blacklistedWords.forEach(word => {
        if (message.content.includes (word)) {
            message.reply('Nehreš >:(');
            message.delete();
            return;
        }
        if (message.author.username.includes(word) || message.author.nickname.includes(word)) {
            var nicknames = config.nicknames;
            message.author.setNickname(nicknames[Math.floor(Math.random() * nicknames.length)]);
            message.reply('Tvoje meno obsahovalo zakázané slove takže som ťa premenoval na: ' + message.author.nickname);
        }
    });

    let prefix = config.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = message.content.substring(message.content.indexOf(' ')+1);

    if(message.content.startsWith(prefix) && cmd != '!+rep' && cmd != '!-rep' && cmd != 'rep') {
        console.log(message.author.username + ' >> ' + message.content);
        let commandfile = client.commands.get(cmd.slice(prefix.length)) || client.commands.get(client.aliases.get(cmd.slice(prefix.length)))
        if(commandfile) commandfile.run(client,message,args)
    } else if (message.content.startsWith('+') || message.content.startsWith('-') || cmd === 'rep') {
        console.log(message.author.username + ' >> ' + message.content);
        let commandfile = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd))
        if(commandfile) commandfile.run(client,message,args)
    }
})

client.login(process.env.token);