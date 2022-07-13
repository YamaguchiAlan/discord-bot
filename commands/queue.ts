import { GuildResolvable, Message } from 'discord.js'
import { errorEmbed, noQueue, regularEmbed } from '.'
import client from '../src/bot'

export function queue (args: string[], message: Message) {
  const embed = regularEmbed()

  const error = errorEmbed()

  const queue = client.player.getQueue(message.guildId as GuildResolvable)
  if (!queue || !queue.tracks[0]) { return message.reply({ embeds: [noQueue()] }) }

  const totalPages = Math.ceil(queue.tracks.length / 10) || 1
  const page = (parseInt(args[0]) || 1) - 1

  if ((page + 1) > totalPages || page < 0) {
    error.setTitle(`Invalid Page. There are only ${totalPages} pages of songs`)
    return message.reply({ embeds: [error] })
  }

  const queueString = queue.tracks.slice(page * 10, page * 10 + 10).map((song, i) => {
    return `**${page * 10 + i + 1}.** \`[${song.duration}]\` [${song.title}](${song.url}) -- <@${song.requestedBy.id}>`
  }).join('\n')

  const currentSong = queue.current

  embed
    .setDescription('**Currently Playing**\n' +
          (currentSong ? `\`[${currentSong.duration}]\` [${currentSong.title}](${currentSong.url}) -- <@${currentSong.requestedBy.id}>` : 'None') +
          `\n\n**Queue**\n${queueString}`
    )
    .setFooter({
      text: `Page ${page + 1} of ${totalPages}`
    })
    .setThumbnail(currentSong.thumbnail)

  message.reply({
    embeds: [embed]
  })
}
