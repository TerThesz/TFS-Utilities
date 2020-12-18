const Discord = require("discord.js")
const mongoose = require('mongoose');
const shopJson = require('../../dataSets/shop.json');
const cooldown = new Set();

mongoose.connect(require('../../dataSets/bot.json').mongoose, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Data = require('../../models/data.js');

module.exports.run = (bot, message, args) => {
    if (!cooldown.has(message.author.id)) {
        Data.findOne({
            userID: message.author.id
        }, (err, data) => {
            if (err) console.log(err);

            if (!data) {
                var createTable = require('../../createTable');
                createTable.create(message.author.username, message.author.id);
            }
    
            var canContinue = false;
            var upgrades = 1;
    
            data.active.forEach(item => { if (item === 'počítač') canContinue = true });
            if (!canContinue) return message.channel.send('Na streamovanie si potrebuješ zakúpiť a aktivovať **počítač**.'); 
        
            data.active.forEach(item => {
                if (shopJson.find(i => i.title === item).upgrades.includes('s')) {
                    upgrades++;
                }
            });

            var viewers;
            if (upgrades) {
                if (data.rep > 0) viewers = Math.floor(Math.random() * ((data.rep * upgrades * 100000) - (data.rep * 200)) + (data.rep * 200));
                else viewers = Math.floor(Math.random() * (100000 * upgrades - 200) + 200);
            } else {
                if (data.rep > 0) viewers = Math.floor(Math.random() * ((data.rep * 100000) - (data.rep * 200)) + (data.rep * 200));
                else viewers = Math.floor(Math.random() * (100000 - 200) + 200);
            }
            viewers *= 2;

            const time = Math.floor(Math.random() * (4 - 1) + 1);
            let revenue;
            for (var i = 0; i <= time; i++) {
                var rng = Math.floor(Math.random() * (5 - 1) + 1);

                var donators = Math.floor((viewers / 100 * 10) / 100 * rng);
            }
            if (data.rep >= 5) revenue = Math.floor(Math.random() * ((data.rep * 2) - 5) + 5) * donators / 10;
            else revenue = Math.floor(Math.random() * (10 - 5) + 5) * donators / 10;

            data.balance += Math.floor(revenue);
            data.save().catch(err => console.log(err));

            return message.channel.send(new Discord.MessageEmbed()
                .setColor('GREEN')
                .setTitle('Nový stream')
                .setDescription(`Používateľ **${message.author.username}** ukončil \`${time}-hodinový\` stream a zarobil si **${revenue}€**.`));
    
        });

        cooldown.add(message.author.id);
        setTimeout(() => {
            cooldown.delete(message.author.id);
        },(4 * 60 * 60 * 1000))
    } else {
        return message.channel.send('Tento command môžeš použiť raz za 4 hodiny.');
    }
}

module.exports.config = {
    name: 'stream',
    aliases: [ 'live' ]
}