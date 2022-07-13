import { GuildResolvable, Message } from 'discord.js'
import { noQueue, regularEmbed } from '.'
import client from '../src/bot'

export function nowplaying (message: Message) {
  const queue = client.player.getQueue(message.guildId as GuildResolvable)

  if (!queue) return message.reply({ embeds: [noQueue()] })

  const bar = queue.createProgressBar({
    length: 19,
    timecodes: true
  })

  const song = queue.current

  message.reply({
    embeds: [regularEmbed()
      .setThumbnail(song.thumbnail)
      .setDescription(`Currently Playing **[${song.title}](${song.url})**\n\n` + bar)
      .setThumbnail(song.thumbnail)
    ]
  })
}
