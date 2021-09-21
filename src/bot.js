const {Intents, Client} = require("discord.js")
const botToken = process.env.BOT_TOKEN
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MEMBERS] })
const twitch = require("./twitchApi")
const axios = require("axios")

axios.defaults.headers.post['Client-ID'] = 's7jrmseeftqoo5adql6aqv5s0je3h4'
axios.defaults.headers.post['Authorization'] = 'Bearer 9bul8ba3pk8s3vojaexmu92t3h1b57'

client.on("messageCreate", message => {
    if(message.content.startsWith("!sm_twitch ")){
        twitch.getUsers(message.content.slice(11)).then(data => {
            axios.post("https://api.twitch.tv/helix/eventsub/subscriptions",{
                "type": "stream.online",
                "version": "1",
                "condition": {
                    "broadcaster_user_id": data.data[0].id
                },
                "transport": {
                    "method": "webhook",
                    "callback": "https://9c38-177-74-201-83.ngrok.io/twitch",
                    "secret": "m1_s3cr3t_"
                }
            })
            .then(res => console.log("Notification added successfully"))
            .catch(err => {
                if(err.response.status === 409){
                    console.log("Notification is already exists")
                }
            })
        })
    }
})

client.login(botToken)

module.exports = client