import { GuildResolvable, Message } from 'discord.js'
import { noQueue } from '.'
import client from '../src/bot'

export function quit (message: Message) {
  const queue = client.player.getQueue(message.guildId as GuildResolvable)

  if (!queue) return message.reply({ embeds: [noQueue()] })

  queue.clear()
  queue.destroy()
  message.reply({
    embeds: [
      noQueue()
        .setTitle('See you next time!')
    ]
  })
}
