import { GuildResolvable, Message } from 'discord.js'
import { noQueue, regularEmbed } from '.'
import client from '../src/bot'

export function skip (message: Message) {
  const queue = client.player.getQueue(message.guildId as GuildResolvable)

  if (!queue || !queue.tracks[0]) return message.reply({ embeds: [noQueue()] })

  const currentSong = queue.current

  queue.skip()
  message.reply({
    embeds: [
      regularEmbed()
        .setDescription(`**[${currentSong.title}](${currentSong.url})** has been skipped!`)
        .setThumbnail(currentSong.thumbnail)
    ]
  })
}
