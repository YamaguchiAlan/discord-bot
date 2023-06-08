import { GatewayIntentBits, Client } from 'discord.js'
import { Player } from 'discord-player'
import { YouTubeExtractor, SpotifyExtractor, AppleMusicExtractor, SoundCloudExtractor } from '@discord-player/extractor'
import { Commands, DiscordClient, PlayCommandActions } from '../types'
import { play, queue, quit, shuffle, pause, resume, skip, skipto, nowplaying, remove, search, volume, setprefix, viewPrefix, help } from '../commands'
import Server from '../models/server'

const botToken = (process.env.BOT_TOKEN as string)
const client = (new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildVoiceStates]
}) as DiscordClient)
const defaultPrefix = '$'

export function botLogin () {
  client.login(botToken)
}

const cookie = process.env.COOKIE

// Discord Player

const player = new Player(client, {
  ytdlOptions: {
    quality: 'highestaudio',
    highWaterMark: 1 << 25,
    requestOptions: {
      Headers: {
        cookie
      }
    }
  }
})

player.extractors.register(YouTubeExtractor, {})
player.extractors.register(SpotifyExtractor, {})
player.extractors.register(AppleMusicExtractor, {})
player.extractors.register(SoundCloudExtractor, {})

// Message event

client.on('messageCreate', async (message) => {
  if (message.author.bot) return
  if (!message.guild) return

  let server = await Server.findOne({ server_id: message.guildId }, 'prefix')

  if (!server) {
    server = await new Server({ server_id: message.guildId })
    await server.save()
  }
  if (!server?.prefix) {
    server!.prefix = defaultPrefix
    await server!.save()
  }

  const prefix = server!.prefix

  if (!message.content.startsWith(prefix)) return

  const [CMD_NAME, ...args] = message.content.trim().substring(prefix.length).split(/\s+/)

  if (CMD_NAME === Commands.PLAY && args[0]) {
    play(args, message, PlayCommandActions.SEARCH)
  } else if (CMD_NAME === Commands.PLAYLIST && args[0] && !args[1]) {
    play(args, message, PlayCommandActions.PLAYLIST)
  } else if (CMD_NAME === Commands.SPOTIFY_PLAYLIST && args[0] && !args[1]) {
    play(args, message, PlayCommandActions.SPOTIFY_PLAYLIST)
  } else if (CMD_NAME === Commands.QUEUE && !args[1]) {
    queue(args, message)
  } else if (CMD_NAME === Commands.QUIT && !args[0]) {
    quit(message)
  } else if (CMD_NAME === Commands.SHUFFLE && !args[0]) {
    shuffle(message)
  } else if (CMD_NAME === Commands.NOWPLAYING && !args[0]) {
    nowplaying(message)
  } else if (CMD_NAME === Commands.PAUSE && !args[0]) {
    pause(message)
  } else if (CMD_NAME === Commands.RESUME && !args[0]) {
    resume(message)
  } else if (CMD_NAME === Commands.SKIP && !args[0]) {
    skip(message)
  } else if (CMD_NAME === Commands.SKIPTO && args[0] && !args[1]) {
    skipto(args, message)
  } else if (CMD_NAME === Commands.REMOVE && args[0] && !args[1]) {
    remove(args, message)
  } else if (CMD_NAME === Commands.SEARCH && args[0]) {
    search(args, message)
  } else if (CMD_NAME === Commands.VOLUME && args[0] && !args[1]) {
    volume(args, message)
  } else if (CMD_NAME === Commands.SETPREFIX && args[0] && !args[1]) {
    setprefix(args, message, server)
  } else if (CMD_NAME === Commands.PREFIX && !args[0]) {
    viewPrefix(prefix, message)
  } else if (CMD_NAME === Commands.HELP && !args[1]) {
    help(message)
  }
})

export default client
