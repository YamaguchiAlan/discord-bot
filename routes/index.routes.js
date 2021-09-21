const {Router} = require("express")
const router = Router()
const client = require("../src/bot")
const twitch = require("../src/twitchApi")

const generalChannelId = process.env.GENERAL_CHANNEL_ID

router.post("/twitch/stream/live", (req, res) => {
    const {challenge, event: broadcaster_user_id, broadcaster_user_name} = req.body

    if(challenge){
        res.status(200).send(req.body.challenge)
    } else {
        twitch.getStreams({channel: broadcaster_user_id}).then(data => {
            const generalChannel = client.channels.cache.get(generalChannelId)
            generalChannel.send(`${broadcaster_user_name} is streaming "${data.data[0].title}" https://twitch.tv/${broadcaster_user_name}`)
            res.status(200).end()
        })
    }
})

module.exports = router