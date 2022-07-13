import { GuildResolvable, Message } from 'discord.js'
import { noQueue, regularEmbed } from '.'
import client from '../src/bot'

export function pause (message: Message) {
  const queue = client.player.getQueue(message.guildId as GuildResolvable)

  if (!queue) return message.reply({ embeds: [noQueue()] })

  const song = queue.current

  queue.setPaused(true)
  message.reply({
    embeds: [
      regularEmbed()
        .setTitle('Music has been paused!')
        .setDescription(`Current song **[${song.title}](${song.url})**`)
        .setThumbnail(song.thumbnail)
    ]
  })
}
