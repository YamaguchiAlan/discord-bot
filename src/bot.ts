import {Intents, Client} from "discord.js"

const botToken = (process.env.BOT_TOKEN as string)
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MEMBERS] })

export function botLogin() {
    client.login(botToken)
}

export default client