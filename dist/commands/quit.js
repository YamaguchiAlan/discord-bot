"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quit = void 0;
const _1 = require(".");
const discord_player_1 = require("discord-player");
function quit(message) {
    const player = (0, discord_player_1.useMasterPlayer)();
    const queue = player.nodes.get(message.guildId);
    if (!queue)
        return message.reply({ embeds: [(0, _1.noQueue)()] });
    queue.tracks.clear();
    queue.delete();
    message.reply({
        embeds: [
            (0, _1.noQueue)()
                .setTitle('See you next time!')
        ]
    });
}
exports.quit = quit;
