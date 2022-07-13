import { MessageEmbed } from 'discord.js'
import client from '../src/bot'
import { play } from './play'
import { queue } from './queue'
import { quit } from './quit'
import { shuffle } from './shuffle'
import { nowplaying } from './nowplaying'
import { pause } from './pause'
import { resume } from './resume'
import { skip } from './skip'
import { skipto } from './skipto'
import { remove } from './remove'
import { search } from './search'
import { volume } from './volume'
import { setprefix } from './setprefix'
import { prefix } from './prefix'
import { help } from './help'

export {
  play,
  queue,
  quit,
  shuffle,
  nowplaying,
  pause,
  resume,
  skip,
  skipto,
  remove,
  search,
  volume,
  setprefix,
  prefix as viewPrefix,
  help
}

export const regularEmbed = () => (
  new MessageEmbed()
    .setColor('#0ec9a6')
    .setAuthor({ name: 'Yamabot', iconURL: `https://cdn.discordapp.com/avatars/${client.user?.id}/${client.user?.avatar}.webp?size=100` })
)

export const errorEmbed = () => (
  new MessageEmbed()
    .setColor('DARK_RED')
    .setFooter({ text: '- Yamabot' })
)

export const noQueue = () => (
  new MessageEmbed()
    .setColor('#0ec9a6')
    .setTitle('There are no songs in the queue')
    .setFooter({ text: '- Yamabot' })
)
