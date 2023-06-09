import { Message } from 'discord.js'
import { QueryType, useMasterPlayer } from 'discord-player'
import { errorEmbed, regularEmbed } from '.'

export async function search (args: string[], message: Message) {
  const query = args.join(' ')
  const player = useMasterPlayer()!

  const result = await player.search(query, {
    requestedBy: message.author,
    searchEngine: QueryType.AUTO
  })

  if (result.tracks.length === 0) {
    return message.reply({
      embeds: [errorEmbed().setTitle(`Track **${query}** not found!`)]
    })
  }

  const embed = regularEmbed()

  const queueString = result.tracks.slice(0, 10).map((song, i) => {
    return `**${i + 1}.** \`[${song.duration}]\` [${song.title}](${song.url})`
  }).join('\n')

  embed
    .setDescription(`**Results for "${query}"**\n${queueString}`)
    .setThumbnail(result.tracks[0].thumbnail)

  message.reply({
    embeds: [embed]
  })
}
