import { GuildResolvable, Message } from 'discord.js'
import { noQueue } from '.'
import { useMasterPlayer } from 'discord-player'

export function quit (message: Message) {
  const player = useMasterPlayer()!
  const queue = player.nodes.get(message.guildId as GuildResolvable)

  if (!queue) return message.reply({ embeds: [noQueue()] })

  queue.tracks.clear()
  queue.delete()
  message.reply({
    embeds: [
      noQueue()
        .setTitle('See you next time!')
    ]
  })
}
