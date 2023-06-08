import { Request, Response, Router } from 'express'
import { TextChannel, EmbedBuilder, ColorResolvable } from 'discord.js'
import client from '../src/bot'
import twitch from '../src/twitchApi'
import Notifications from '../models/notification'
import crypto from 'crypto'

import { MessageType } from './types'

const router = Router()

router.get('/', (req: Request, res: Response) => {
  res.status(200).send({ ok: true })
})

router.post('/twitch/stream/live', async (req: Request, res: Response) => {
  const { challenge, event } = req.body

  if (verifyMessage(req)) {
    if (req.headers['twitch-eventsub-message-type'] === MessageType.CallbackVerification) {
      res.status(200).send(challenge)
    } else if (req.headers['twitch-eventsub-message-type'] === MessageType.Notification) {
      res.sendStatus(204)
      twitch.getStreams({ channel: event.broadcaster_user_id }).then(async (data) => {
        if (data.data[0]) {
          const notifications = await Notifications.find({ twitchUserId: event.broadcaster_user_id }, 'channel message embedMessage embed')
          const stream = data.data[0]
          const user = (await twitch.getUsers(stream.user_id)).data[0]
          const game = (await twitch.getGames(stream.game_id)).data[0]

          const parseMessage = (message: string) => (
            message.split('{title}').join(stream.title)
              .split('{viewers}').join(stream.viewer_count.toString())
              .split('{game}').join(game.name)
              .split('{url}').join(`https://twitch.tv/${stream.user_name}`)
              .split('{name}').join('`' + stream.user_name + '`')
          )

          notifications.forEach(async (n) => {
            try {
              const channel = await client.channels.cache.get(n.channel)
              const message = parseMessage(n.message)

              if (n.embedMessage) {
                const embed = new EmbedBuilder()
                  .setColor((n.embed!.color as ColorResolvable))
                  .setTitle(parseMessage(n.embed!.title))
                  .setAuthor({
                    name: user.display_name,
                    iconURL: user.profile_image_url,
                    url: `https://twitch.tv/${stream.user_name}`
                  })
                  .setDescription(`${parseMessage(n.embed!.description)} \n [Watch Stream](https://twitch.tv/${stream.user_name})`)
                  .setTimestamp()
                  .setFooter({ text: 'YamaBot' })

                if (n.embed!.titleAsUrl) {
                  embed.setURL(`https://twitch.tv/${stream.user_name}`)
                }

                if (n.embed!.previewImage) {
                  embed.setImage(stream.thumbnail_url.split('{width}').join('445').split('{height}').join('250'))
                }

                await (channel as TextChannel).send({ embeds: [embed], content: message })
              } else {
                await (channel as TextChannel).send(message)
              }
            } catch (error) {
            }
          })
        }
      })
    }
  } else {
    res.sendStatus(403)
  }
})

const verifyMessage = (req: Request) => {
  const message = (req.headers['twitch-eventsub-message-id'] as string) +
        (req.headers['twitch-eventsub-message-timestamp'] as string) +
        JSON.stringify(req.body)

  const hmac = 'sha256=' + crypto.createHmac('sha256', (process.env.TWITCH_SUBSCRIPTION_SECRET as string))
    .update(message)
    .digest('hex')

  return crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from((req.headers['twitch-eventsub-message-signature'] as string)))
}

export default router
