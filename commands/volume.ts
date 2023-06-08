import { GuildResolvable, Message } from 'discord.js'
import { noQueue, errorEmbed } from '.'
import { useMasterPlayer } from 'discord-player'

export function volume (args: string[], message: Message) {
  const player = useMasterPlayer()!
  const queue = player.nodes.get(message.guildId as GuildResolvable)

  if (!queue) return message.reply({ embeds: [noQueue()] })

  const volume = parseInt(args[0])

  if (isNaN(volume)) {
    return message.reply({
      embeds: [
        errorEmbed()
          .setTitle('Invalid volume value. Not a number')
      ]
    })
  }

  if (volume > 100 || volume < 0) {
    return message.reply({
      embeds: [
        errorEmbed()
          .setTitle('Invalid volume value. Please insert a number between 0 and 100')
      ]
    })
  }

  queue.node.setVolume(volume)

  message.reply({
    embeds: [
      noQueue()
        .setTitle(`Volume set to ${volume}`)
    ]
  })
}
