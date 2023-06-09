"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shuffle = void 0;
const _1 = require(".");
const discord_player_1 = require("discord-player");
function shuffle(message) {
    const player = (0, discord_player_1.useMasterPlayer)();
    const queue = player.nodes.get(message.guildId);
    if (!queue || queue.isEmpty())
        return message.reply({ embeds: [(0, _1.noQueue)()] });
    queue.tracks.shuffle();
    message.reply({
        embeds: [
            (0, _1.noQueue)()
                .setTitle(`The queue of ${queue.getSize()} songs have been shuffled!`)
        ]
    });
}
exports.shuffle = shuffle;
