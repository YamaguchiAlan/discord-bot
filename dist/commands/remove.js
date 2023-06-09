"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = void 0;
const _1 = require(".");
const discord_player_1 = require("discord-player");
function remove(args, message) {
    const player = (0, discord_player_1.useMasterPlayer)();
    const queue = player.nodes.get(message.guildId);
    if (!queue)
        return message.reply({ embeds: [(0, _1.noQueue)()] });
    const trackNum = parseInt(args[0]);
    if (isNaN(trackNum)) {
        return message.reply({
            embeds: [
                (0, _1.errorEmbed)()
                    .setTitle('Invalid track number. Not a number')
            ]
        });
    }
    if (trackNum > queue.getSize() || trackNum < 1) {
        return message.reply({
            embeds: [
                (0, _1.errorEmbed)()
                    .setTitle(`Invalid track number. There are only ${queue.getSize()} songs`)
            ]
        });
    }
    const removedTrack = queue.removeTrack(trackNum - 1);
    message.reply({
        embeds: [
            (0, _1.noQueue)()
                .setTitle(`Track ${removedTrack.title} has been removed from the queue`)
        ]
    });
}
exports.remove = remove;
