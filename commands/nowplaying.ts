import { GuildResolvable, Message } from 'discord.js'
import { noQueue, regularEmbed } from '.'
import { useMasterPlayer } from 'discord-player'

export function nowplaying (message: Message) {
  const player = useMasterPlayer()!
  const queue = player.nodes.get(message.guildId as GuildResolvable)

  if (!queue) return message.reply({ embeds: [noQueue()] })

  const bar = queue.node.createProgressBar({
    length: 19,
    timecodes: true
  })

  const song = queue.currentTrack!

  message.reply({
    embeds: [regularEmbed()
      .setThumbnail(song.thumbnail)
      .setDescription(`Currently Playing **[${song.title}](${song.url})**\n\n` + bar)
      .setThumbnail(song.thumbnail)
    ]
  })
}
