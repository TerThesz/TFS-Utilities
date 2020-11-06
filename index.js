const Discord = require('discord.js');
const config = require('./bot.json');
const { blacklistedWords } = require('./blacklist.json');
const client = new Discord.Client({disableEveryone: true},{ partials: ['MESSAGE', 'CHANEEL', 'REACTION']});

const { join } = require("path");
const fs = require("fs");

const antiAd = require('./antiAd');
const AntiSpam = require('discord-anti-spam');
const antiSpam = new AntiSpam({
    warnThreshold: 3,
    kickThreshold: 7,
    banThreshold: 7,
    maxInterval: 2000,
    warnMessage: '{@user} nespamuj!',
    kickMessage: '**{user_tag}** bol vyhodený za: spam',
    banMessage: '**{user_tag}** bol zabanovaný za: spam',
    maxDuplicatesWarning: 7,
    maxDuplicatesKick: 10,
    maxDuplicatesBan: 12,
    exemptPermissions: [ 'ADMINISTRATOR'],
    ignoreBots: true,
    verbose: true,
    ignoredUsers: [],
});

client.on("guildMemberAdd", member => {
    for (var role in config.joinRoles) {
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
    antiAd(client);

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

    jsfile.forEach((f, i) => {
        let pull = require(`./commands/${f}`);
        console.log(f + ' loaded!');
        client.commands.set(pull.config.name, pull);  
        pull.config.aliases.forEach(alias => {
            client.aliases.set(alias, pull.config.name)
        });
    });

    const getDirectories = source =>
    fs.readdirSync(source, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
    
    const _dirs = getDirectories("./commands/");
    _dirs.forEach(dir => {
        console.log(dir);
        fs.readdir('./commands/' + dir, (_err, _files) => {
            dir = './commands/' + dir + '/';

            if(_err) console.log(_err);
        
            let _jsfile = _files.filter(f => f.split(".").pop() === "js") 
        
            _jsfile.forEach((f, i) => {
                let pull = require(dir + `${f}`);
                console.log(f + ' loaded!');
                client.commands.set(pull.config.name, pull);  
                pull.config.aliases.forEach(alias => {
                    client.aliases.set(alias, pull.config.name)
                });
            });
        });
    });
});

client.on("message", message => {
    antiSpam.message(message);
    if(message.author === client || message.channel.type === "dm") return;
    blacklistedWords.forEach(word => {
        if (message.content.includes (word)) {
            message.reply('Nehreš >:(');
            message.delete();
            return;
        }
    });

    let prefix = config.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = message.content.substring(message.content.indexOf(' ')+1);

    var canAdd = true;
    config.allPrefixes.forEach(prefix => {
        if (message.content.startsWith(prefix)) canAdd = false;
    });
    if (canAdd) {
        const addMessage = require('./addMessage');
        addMessage.run(client, message, args);
    }

    if(message.content.startsWith(prefix) && cmd != '!+rep' && cmd != '!-rep' && cmd != 'rep' && cmd != 'rep-lb') {
        console.log(message.author.username + ' >> ' + message.content);
        let commandfile = client.commands.get(cmd.slice(prefix.length)) || client.commands.get(client.aliases.get(cmd.slice(prefix.length)))
        if(commandfile) commandfile.run(client,message,args)
    } else if (message.content.startsWith('+') || message.content.startsWith('-') || cmd === 'rep') {
        console.log(message.author.username + ' >> ' + message.content);
        let commandfile = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd))
        if(commandfile) commandfile.run(client,message,args)
    } else {
        config.podakovanie.forEach(string => {
            if(cmd.toLowerCase().startsWith(string)) {
                if(message.mentions.users.first()) {
                    console.log(message.author.username + ' >> ' + message.content);
                    let commandfile = client.commands.get('+rep') || client.commands.get(client.aliases.get('+rep'))
                    if(commandfile) commandfile.run(client,message,args)
                } else {
                    const exampleEmbed = new Discord.MessageEmbed()
                    .setColor('#73df57')
                    .setDescription(`Pre super bomba špica poďakovanie označ používateľa keď ďakuješ čím mu zvýšiš reputáciu.`)
                    message.channel.send(exampleEmbed);
                }
            }
        });
    }
});

client.on('messageReactionAdd', async (reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();

    if (user.bot) return;
    if (!reaction.message.guild) return;

    if (reaction.message.channel.id === config.reactionRolesChannelID) {
        if (reaction.emoji.name === '🤗') {
            console.log('true');
        }
    }
});
client.on('messageReactionRemove', async (reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();

    if (user.bot) return;
    if (!reaction.message.guild) return;

    if (reaction.message.channel.id === config.reactionRolesChannelID) {
        if (reaction.emoji.name === '🤗') {
            console.log('true-');
        }
    }
});

client.login("NzcyOTQyMzg4MDQ5MzQ2NTYy.X6CAsQ.Y6fyQ9DFt02750YpH2_XW_NI8oA");