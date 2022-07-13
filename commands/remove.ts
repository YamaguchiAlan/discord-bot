import { GuildResolvable, Message } from 'discord.js'
import { noQueue, errorEmbed } from '.'
import client from '../src/bot'

export function remove (args: string[], message: Message) {
  const queue = client.player.getQueue(message.guildId as GuildResolvable)

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

  if (trackNum > queue.tracks.length || trackNum < 1) {
    return message.reply({
      embeds: [
        errorEmbed()
          .setTitle(`Invalid track number. There are only ${queue.tracks.length} songs`)
      ]
    })
  }
  const removedTrack = queue.remove(trackNum - 1)

  message.reply({
    embeds: [
      noQueue()
        .setTitle(`Track ${removedTrack.title} has been removed from the queue`)
    ]
  })
}
