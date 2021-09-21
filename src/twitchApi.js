const TwitchAPI = require('node-twitch').default

const twitch = new TwitchAPI({
    client_id: process.env.APP_CLIENT_ID,
    client_secret: process.env.APP_SECRET_TOKEN
})

module.exports = twitch