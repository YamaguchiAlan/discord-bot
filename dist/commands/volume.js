"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.volume = void 0;
const _1 = require(".");
const discord_player_1 = require("discord-player");
function volume(args, message) {
    const player = (0, discord_player_1.useMasterPlayer)();
    const queue = player.nodes.get(message.guildId);
    if (!queue)
        return message.reply({ embeds: [(0, _1.noQueue)()] });
    const volume = parseInt(args[0]);
    if (isNaN(volume)) {
        return message.reply({
            embeds: [
                (0, _1.errorEmbed)()
                    .setTitle('Invalid volume value. Not a number')
            ]
        });
    }
    if (volume > 100 || volume < 0) {
        return message.reply({
            embeds: [
                (0, _1.errorEmbed)()
                    .setTitle('Invalid volume value. Please insert a number between 0 and 100')
            ]
        });
    }
    queue.node.setVolume(volume);
    message.reply({
        embeds: [
            (0, _1.noQueue)()
                .setTitle(`Volume set to ${volume}`)
        ]
    });
}
exports.volume = volume;
