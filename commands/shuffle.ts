import { GuildResolvable, Message } from 'discord.js'
import { noQueue } from '.'
import { useMasterPlayer } from 'discord-player'

export function shuffle (message: Message) {
  const player = useMasterPlayer()!
  const queue = player.nodes.get(message.guildId as GuildResolvable)

  if (!queue || queue.isEmpty()) return message.reply({ embeds: [noQueue()] })

  queue.tracks.shuffle()
  message.reply({
    embeds: [
      noQueue()
        .setTitle(`The queue of ${queue.getSize()} songs have been shuffled!`)
    ]
  })
}
