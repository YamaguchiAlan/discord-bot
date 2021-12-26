const {Router} = require("express")
const router = Router()
const client = require("../src/bot")
const twitch = require("../src/twitchApi")
const Notifications = require("../models/notification")
const crypto = require("crypto")
const {MessageEmbed} = require("discord.js")

router.get("/", (req, res) => {
    res.status(200).send({ok: true})
})

router.post("/twitch/stream/live", async (req, res) => {
    const {challenge, event} = req.body

    if(verifyMessage(req)){
        if(req.headers["twitch-eventsub-message-type"] === "webhook_callback_verification"){
            res.status(200).send(challenge)
        }
        else if(req.headers["twitch-eventsub-message-type"] === "notification"){
            res.sendStatus(204)
            twitch.getStreams({channel: event.broadcaster_user_id}).then(async data => {
                if(data.data[0]){
                    const notifications = await Notifications.find({twitchUserId: event.broadcaster_user_id}, "channel message")
                    const user = await twitch.getUsers(data.data[0].user_id)

                    notifications.forEach(async (n) => {
                        try {
                            const channel = await client.channels.cache.get(n.channel)
                            let message = n.message.split("{title}").join(data.data[0].title)
                                .split("{viewers}").join(data.data[0].viewer_count)
                                .split("{game}").join(data.data[0].game_name)
                                .split("{url}").join(`https://twitch.tv/${data.data[0].user_name}`)
                                .split("{name}").join("`" + data.data[0].user_name + "`")

                            const embed = new MessageEmbed()
                                .setColor("AQUA")
                                .setTitle(data.data[0].title)
                                .setURL(`https://twitch.tv/${data.data[0].user_name}`)
                                .setAuthor(user.data[0].display_name, user.data[0].profile_image_url, `https://twitch.tv/${data.data[0].user_name}`)
                                .setDescription(`Playing ${data.data[0].game_name} \n [Watch Stream](https://twitch.tv/${data.data[0].user_name})`)
                                .setImage(data.data[0].thumbnail_url.split("{width}").join("445").split("{height}").join("250"))
                                .setTimestamp()
                                .setFooter("YamaBot")
                            await channel.send({embeds: [embed], content: message})
                        } catch (error) {
                        }
                    })
                }
            })
        }
    } else{
        res.sendStatus(403)
    }
})

const verifyMessage = (req) => {
    const message = req.headers["twitch-eventsub-message-id"] +
        req.headers["twitch-eventsub-message-timestamp"] +
        JSON.stringify(req.body)

    const hmac = "sha256=" + crypto.createHmac('sha256', process.env.TWITCH_SUBSCRIPTION_SECRET)
        .update(message)
        .digest("hex")

    return crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(req.headers["twitch-eventsub-message-signature"]))
}

module.exports = router