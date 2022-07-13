import { Document } from 'mongoose'
import { BeAnObject } from '@typegoose/typegoose/lib/types'
import { Message } from 'discord.js'
import { noQueue, errorEmbed } from '.'
import { Server } from '../models/server'

export async function setprefix (args: string[], message: Message, Server: Document <any, BeAnObject, any> & Server | null) {
  const newPrefix = args[0]

  if (newPrefix.length > 3) {
    return message.reply({
      embeds: [errorEmbed().setTitle('Invalid prefix. The prefix must have a max of 3 characters')]
    })
  }

  if (newPrefix === Server!.prefix) {
    return message.reply({
      embeds: [errorEmbed().setTitle('The prefix `' + newPrefix + '` is the current prefix')]
    })
  }

  Server!.prefix = newPrefix
  await Server!.save()

  message.reply({
    embeds: [
      noQueue()
        .setTitle('Prefix changed to `' + newPrefix + '`')
    ]
  })
}
