import { GuildResolvable, Message } from 'discord.js'
import { QueryType, useMasterPlayer } from 'discord-player'
import { PlayCommandActions } from '../types'
import { errorEmbed, regularEmbed } from '.'

export async function play (args: string[], message: Message, action: PlayCommandActions) {
  const embed = regularEmbed()
  const error = errorEmbed()
  const player = useMasterPlayer()!

  if (!message.member!.voice.channel) {
    error.setTitle('You need to be in a Voice Channel to use this command')

    return message.reply({
      embeds: [error]
    })
  }

  const queue = player.nodes.create((message.guild as GuildResolvable), {
    metadata: {
      channel: message.channel
    }
  })

  try {
    if (!queue.connection) await queue.connect(message.member!.voice.channel)
  } catch {
    queue.delete()
    error.setTitle('Could not join your voice channel!')

    return message.reply({
      embeds: [error]
    })
  }

  const query = args.join(' ')

  if (action === PlayCommandActions.SEARCH) {
    const result = await player.search(query, {
      requestedBy: message.author,
      searchEngine: QueryType.AUTO
    })

    if (result.tracks.length === 0) {
      error.setTitle(`Track **${query}** not found!`)

      if (queue.isEmpty() && !queue.node.isPlaying()) {
        queue.delete()
      }

      return message.reply({
        embeds: [error]
      })
    }

    const song = result.tracks[0]
    await queue.addTrack(song)
    embed
      .setDescription(`**[${song.title}](${song.url})** has been added to the Queue`)
      .setThumbnail(song.thumbnail)
      .setFooter({ text: `Duration: ${song.duration}` })
  } else if (action === PlayCommandActions.PLAYLIST) {
    const result = await player.search(query, {
      requestedBy: message.author,
      searchEngine: QueryType.YOUTUBE_PLAYLIST
    })

    if (result.tracks.length === 0) {
      error.setTitle('Playlist not found!')

      if (queue.isEmpty() && !queue.node.isPlaying()) {
        queue.delete()
      }

      return message.reply({
        embeds: [error]
      })
    }

    const playlist = result.playlist!
    await queue.addTrack(result.tracks)
    embed
      .setDescription(`**${result.tracks.length} songs from [${playlist.title}](${playlist.url})** have been added to the Queue`)
      .setThumbnail(playlist.thumbnail)
  } else if (action === PlayCommandActions.SPOTIFY_PLAYLIST) {
    try {
      const result = await player.search(query, {
        requestedBy: message.author,
        searchEngine: QueryType.SPOTIFY_PLAYLIST
      })

      if (result.tracks.length === 0) {
        error.setTitle('Playlist not found!')

        if (queue.isEmpty() && !queue.node.isPlaying()) {
          queue.delete()
        }

        return message.reply({
          embeds: [error]
        })
      }

      const playlist = result.playlist!
      await queue.addTrack(result.tracks)
      embed
        .setDescription(`**${result.tracks.length} songs from [${playlist.title}](${playlist.url})** have been added to the Queue`)
        .setThumbnail(playlist.thumbnail)
    } catch (err) {
      error.setTitle('Playlist not found!')

      if (queue.isEmpty() && !queue.node.isPlaying()) {
        queue.delete()
      }

      return message.reply({
        embeds: [error]
      })
    }
  }

  if (!queue.node.isPlaying()) await queue.node.play()
  message.reply({
    embeds: [embed]
  })
}
