const {Intents, Client} = require("discord.js")
const botToken = process.env.BOT_TOKEN
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MEMBERS] })

client.login(botToken)

module.exports = client