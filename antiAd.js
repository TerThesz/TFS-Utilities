module.exports = (client) => {
    const isInvite = async (guild, code) => {
        return await new Promise(resolve =>{
            guild.fetchInvites().then(invites => {
                for (const invite in invites) {
                    if (code === invite[0]) {
                        resolve(true);
                        return;
                    }
                }

                resolve(false);
                return;
            }); 
        });
    }

    client.on('message', async message => {
        const { member, content } = message;

        const code = content.split('discord.gg/')[1];

        if (content.includes('discord.gg/')) {
            const isGuildInv = await isInvite(guild, code)
            console.log(isGuildInv);
        }
    })
}