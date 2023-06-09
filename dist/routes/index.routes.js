"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const discord_js_1 = require("discord.js");
const bot_1 = __importDefault(require("../src/bot"));
const twitchApi_1 = __importDefault(require("../src/twitchApi"));
const notification_1 = __importDefault(require("../models/notification"));
const crypto_1 = __importDefault(require("crypto"));
const types_1 = require("./types");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.status(200).send({ ok: true });
});
router.post('/twitch/stream/live', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { challenge, event } = req.body;
    if (verifyMessage(req)) {
        if (req.headers['twitch-eventsub-message-type'] === types_1.MessageType.CallbackVerification) {
            res.status(200).send(challenge);
        }
        else if (req.headers['twitch-eventsub-message-type'] === types_1.MessageType.Notification) {
            res.sendStatus(204);
            twitchApi_1.default.getStreams({ channel: event.broadcaster_user_id }).then((data) => __awaiter(void 0, void 0, void 0, function* () {
                if (data.data[0]) {
                    const notifications = yield notification_1.default.find({ twitchUserId: event.broadcaster_user_id }, 'channel message embedMessage embed');
                    const stream = data.data[0];
                    const user = (yield twitchApi_1.default.getUsers(stream.user_id)).data[0];
                    const game = (yield twitchApi_1.default.getGames(stream.game_id)).data[0];
                    const parseMessage = (message) => (message.split('{title}').join(stream.title)
                        .split('{viewers}').join(stream.viewer_count.toString())
                        .split('{game}').join(game.name)
                        .split('{url}').join(`https://twitch.tv/${stream.user_name}`)
                        .split('{name}').join('`' + stream.user_name + '`'));
                    notifications.forEach((n) => __awaiter(void 0, void 0, void 0, function* () {
                        try {
                            const channel = yield bot_1.default.channels.cache.get(n.channel);
                            const message = parseMessage(n.message);
                            if (n.embedMessage) {
                                const embed = new discord_js_1.EmbedBuilder()
                                    .setColor(n.embed.color)
                                    .setTitle(parseMessage(n.embed.title))
                                    .setAuthor({
                                    name: user.display_name,
                                    iconURL: user.profile_image_url,
                                    url: `https://twitch.tv/${stream.user_name}`
                                })
                                    .setDescription(`${parseMessage(n.embed.description)} \n [Watch Stream](https://twitch.tv/${stream.user_name})`)
                                    .setTimestamp()
                                    .setFooter({ text: 'YamaBot' });
                                if (n.embed.titleAsUrl) {
                                    embed.setURL(`https://twitch.tv/${stream.user_name}`);
                                }
                                if (n.embed.previewImage) {
                                    embed.setImage(stream.thumbnail_url.split('{width}').join('445').split('{height}').join('250'));
                                }
                                yield channel.send({ embeds: [embed], content: message });
                            }
                            else {
                                yield channel.send(message);
                            }
                        }
                        catch (error) {
                        }
                    }));
                }
            }));
        }
    }
    else {
        res.sendStatus(403);
    }
}));
const verifyMessage = (req) => {
    const message = req.headers['twitch-eventsub-message-id'] +
        req.headers['twitch-eventsub-message-timestamp'] +
        JSON.stringify(req.body);
    const hmac = 'sha256=' + crypto_1.default.createHmac('sha256', process.env.TWITCH_SUBSCRIPTION_SECRET)
        .update(message)
        .digest('hex');
    return crypto_1.default.timingSafeEqual(Buffer.from(hmac), Buffer.from(req.headers['twitch-eventsub-message-signature']));
};
exports.default = router;
