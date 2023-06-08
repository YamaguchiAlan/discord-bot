import { GuildResolvable, Message } from 'discord.js'
import { noQueue, regularEmbed } from '.'
import { useMasterPlayer } from 'discord-player'

export function resume (message: Message) {
  const player = useMasterPlayer()!
  const queue = player.nodes.get(message.guildId as GuildResolvable)

  if (!queue) return message.reply({ embeds: [noQueue()] })

  const song = queue.currentTrack!

  queue.node.resume()
  message.reply({
    embeds: [
      regularEmbed()
        .setTitle('Music has been resumed!')
        .setDescription(`Current song **[${song.title}](${song.url})**`)
        .setThumbnail(song.thumbnail)
    ]
  })
}
