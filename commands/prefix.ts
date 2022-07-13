import { Message } from 'discord.js'
import { noQueue } from '.'

export function prefix (prefix: string, message: Message) {
  return message.reply({
    embeds: [
      noQueue()
        .setTitle('Current prefix: `' + prefix + '`')
    ]
  })
}
