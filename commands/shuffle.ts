import { GuildResolvable, Message } from 'discord.js'
import { noQueue } from '.'
import client from '../src/bot'

export function shuffle (message: Message) {
  const queue = client.player.getQueue(message.guildId as GuildResolvable)

  if (!queue || !queue.tracks[0]) return message.reply({ embeds: [noQueue()] })

  queue.shuffle()
  message.reply({
    embeds: [
      noQueue()
        .setTitle(`The queue of ${queue.tracks.length} songs have been shuffled!`)
    ]
  })
}
