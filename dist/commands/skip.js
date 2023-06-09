"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skip = void 0;
const _1 = require(".");
const discord_player_1 = require("discord-player");
function skip(message) {
    const player = (0, discord_player_1.useMasterPlayer)();
    const queue = player.nodes.get(message.guildId);
    if (!queue || queue.isEmpty())
        return message.reply({ embeds: [(0, _1.noQueue)()] });
    const currentSong = queue.currentTrack;
    queue.node.skip();
    message.reply({
        embeds: [
            (0, _1.regularEmbed)()
                .setDescription(`**[${currentSong.title}](${currentSong.url})** has been skipped!`)
                .setThumbnail(currentSong.thumbnail)
        ]
    });
}
exports.skip = skip;
