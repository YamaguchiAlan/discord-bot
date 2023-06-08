import { GuildResolvable, Message } from 'discord.js'
import { noQueue, regularEmbed } from '.'
import { useMasterPlayer } from 'discord-player'

export function skip (message: Message) {
  const player = useMasterPlayer()!
  const queue = player.nodes.get(message.guildId as GuildResolvable)

  if (!queue || queue.isEmpty()) return message.reply({ embeds: [noQueue()] })

  const currentSong = queue.currentTrack!

  queue.node.skip()
  message.reply({
    embeds: [
      regularEmbed()
        .setDescription(`**[${currentSong.title}](${currentSong.url})** has been skipped!`)
        .setThumbnail(currentSong.thumbnail)
    ]
  })
}
