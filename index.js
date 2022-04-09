require('dotenv').config()
const {
    Client,
    Intents
} = require('discord.js');
const client = new Client({
    intents: [Intents.FLAGS.GUILDS]
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'ping') {
        const msg = await interaction.reply({
            content: "Pong!",
            fetchReply: true
        });
        let days = Math.floor(interaction.client.uptime / 86400000);
        let hours = Math.floor(interaction.client.uptime / 3600000) % 24;
        let minutes = Math.floor(interaction.client.uptime / 60000) % 60;
        let seconds = Math.floor(interaction.client.uptime / 1000) % 60;
        const wsPing = Math.round(this.client.ws.ping);
        const roundTrip = (msg.editedTimestamp || msg.createdTimestamp) - (interaction.editedTimestamp || interaction.createdTimestamp);

        const discordLatency = roundTrip - wsPing > 0 ? roundTrip - wsPing : roundTrip;
        const wsLatency = wsPing;

        const totalLatency = discordLatency + wsLatency;
        const used = process.memoryUsage().heapUsed / 1024 / 1024;

        const embed = new MessageEmbed()
            .setColor('2F3136')
            .setFooter("PingChecker")
            .setDescription("🏓 **Pong!** \n> Discord latency: `" + discordLatency + "ms`.\n> Connection latency: `" + wsLatency + "ms`.\n> Total Latency:  `" + totalLatency + "ms`\n\n ⏲️ __Uptime:__ ⏲️\n> " + days + "d " + hours + "h " + minutes + "m " + seconds + "s \n\nMemory usage: `" + Math.round(used * 100) / 100 + "mb`")
        await interaction.editReply({
            content: " ",
            embeds: [embed]
        });
    }
});

client.login(process.env.BOT_TOKEN);