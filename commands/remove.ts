import { GuildResolvable, Message } from 'discord.js'
import { noQueue, errorEmbed } from '.'
import { useMasterPlayer } from 'discord-player'

export function remove (args: string[], message: Message) {
  const player = useMasterPlayer()!
  const queue = player.nodes.get(message.guildId as GuildResolvable)

  if (!queue) return message.reply({ embeds: [noQueue()] })

  const trackNum = parseInt(args[0])

  if (isNaN(trackNum)) {
    return message.reply({
      embeds: [
        errorEmbed()
          .setTitle('Invalid track number. Not a number')
      ]
    })
  }

  if (trackNum > queue.getSize() || trackNum < 1) {
    return message.reply({
      embeds: [
        errorEmbed()
          .setTitle(`Invalid track number. There are only ${queue.getSize()} songs`)
      ]
    })
  }
  const removedTrack = queue.removeTrack(trackNum - 1)!

  message.reply({
    embeds: [
      noQueue()
        .setTitle(`Track ${removedTrack.title} has been removed from the queue`)
    ]
  })
}
