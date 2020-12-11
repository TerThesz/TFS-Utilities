const Discord = require("discord.js")
const mongoose = require('mongoose');
const shopJson = require('../../dataSets/shop.json');
const cooldown = new Set();

mongoose.connect(process.env.mongoose, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Data = require('../../models/data.js');

module.exports.run = (bot, message, args) => {
    console.log(message.author.id);
    if (!cooldown.has(message.author.id)) {
        Data.findOne({
            userID: message.author.id
        }, (err, data) => {
            if (err) console.log(err);
    
            var canContinue = false;
            var upgrades = 1;
            var hasEditor = false;
    
            data.active.forEach(item => { if (item === 'počítač') canContinue = true });
            if (!canContinue) return message.channel.send('Na točenie videa si potrebuješ zakúpiť a aktivovať **počítač**.'); 
        
            data.active.forEach(item => {
                if (shopJson[item].upgrades.includes('s')) {
                    console.log(item.title);
                    upgrades++;
                }
                if (item === 'editor') {
                    hasEditor = true;
                }
            });

            var views;
            if (upgrades) {
                if (data.rep > 0) views = Math.floor(Math.random() * ((data.rep * upgrades * 100000) - (data.rep * 200)) + (data.rep * 200));
                else views = Math.floor(Math.random() * (100000 * upgrades - 200) + 200);
            } else {
                if (data.rep > 0) views = Math.floor(Math.random() * ((data.rep * 100000) - (data.rep * 200)) + (data.rep * 200));
                else views = Math.floor(Math.random() * (100000 - 200) + 200);
            }
            views *= 2;

            const revenue = Math.floor(((views / 1000) - shopJson.find(category => category.title === 'editor').cost));

            if (hasEditor) data.balance += (revenue - 100);
            else data.balance += revenue;
            data.save().catch(err => console.log(err));

            return message.channel.send(new Discord.MessageEmbed()
                .setColor('GREEN')
                .setTitle('Nové video')
                .setDescription(`Používateľ **${message.author.username}** natočil nové video a zarobil si **${revenue}€**.`));
    
        });

        cooldown.add(message.author.id);
        setTimeout(() => {
            cooldown.delete(message.author.id);
        },(2 * 60 * 60 * 1000))
    } else {
        return message.channel.send('Tento command môžeš použiť raz za 2 hodiny.');
    }
}

module.exports.config = {
    name: 'video',
    aliases: [ 'rec', 'record' ]
}