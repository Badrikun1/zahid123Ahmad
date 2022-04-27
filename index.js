const {Collection, Client, Discord} = require('discord.js')
const fetch = require("node-fetch");
const config = require('./config.json');
const moment = require("moment");
const fs = require('fs');
const client = new Client({
    intents: [
        "GUILDS",
        "GUILD_MEMBERS",
        "GUILD_BANS",
        "GUILD_INTEGRATIONS",
        "GUILD_INVITES",
        "GUILD_VOICE_STATES",
        "GUILD_PRESENCES",
        "GUILD_MESSAGES",
        "GUILD_MESSAGE_REACTIONS",
        "GUILD_MESSAGE_TYPING",
        "DIRECT_MESSAGES",
        "DIRECT_MESSAGE_REACTIONS",
        "DIRECT_MESSAGE_TYPING",
    ],
});

module.exports = client;

client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./Commands/");
client.cooldowns = new Collection();
client.config = require("./config.json");
client.logger = require('./Utils/Logger');
client.delay = ms => new Promise(res => setTimeout(res, ms));
client.embedCollection = new Collection();
client.interactions = new Collection();

["Command", "Event"].forEach(handler => {
    require(`./Structures/${handler}`)(client);
});

process.on('unhandledRejection', err => {
  client.logger.error(`Unhandled promise rejection: ${err.message}.`);
  console.log(err);
  });

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Bot is Online!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

client.login(process.env.TOKEN)