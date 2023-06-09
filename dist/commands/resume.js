"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resume = void 0;
const _1 = require(".");
const discord_player_1 = require("discord-player");
function resume(message) {
    const player = (0, discord_player_1.useMasterPlayer)();
    const queue = player.nodes.get(message.guildId);
    if (!queue)
        return message.reply({ embeds: [(0, _1.noQueue)()] });
    const song = queue.currentTrack;
    queue.node.resume();
    message.reply({
        embeds: [
            (0, _1.regularEmbed)()
                .setTitle('Music has been resumed!')
                .setDescription(`Current song **[${song.title}](${song.url})**`)
                .setThumbnail(song.thumbnail)
        ]
    });
}
exports.resume = resume;
