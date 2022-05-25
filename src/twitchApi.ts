import TwitchAPI from 'node-twitch'

const twitch = new TwitchAPI({
  client_id: (process.env.APP_CLIENT_ID as string),
  client_secret: (process.env.APP_SECRET_TOKEN as string)
})

export default twitch
