const config = require('../bot.json');
const mongoose = require('mongoose');

mongoose.connect(config.mongooPass, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Data = require('../models/data.js');

module.exports.run = async (bot, message, args) => {
    const user = message.author;

    Data.findOne({
        userID: user.id
    }, (err, data) => {
        if(error) throw err;
        if(!data) {
            const newData = new Data({
                name: bot.users.cache.get(user.id).username,
                userID: user.id,
                rep: 0,
            });
            newData.save().catch(err => console.log(err));
            return message.channel.send(`${bot.users.cahce.get(user.id).username} má 0 bodov reputácie.`);
        } else {
            return message.channel.send(`${bot.users.cahce.get(user.id).username} má ${data.rep} bodov reputácie.`);
        }
    })
}

module.exports.config = {
    name: "jsonRead",
    description: "Vymaže daný počet správ",
    usage: "!jsonRead",
    accessableby: "Members",
    aliases: ['c', 'purge']
}