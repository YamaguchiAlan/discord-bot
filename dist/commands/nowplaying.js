"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nowplaying = void 0;
const _1 = require(".");
const discord_player_1 = require("discord-player");
function nowplaying(message) {
    const player = (0, discord_player_1.useMasterPlayer)();
    const queue = player.nodes.get(message.guildId);
    if (!queue)
        return message.reply({ embeds: [(0, _1.noQueue)()] });
    const bar = queue.node.createProgressBar({
        length: 19,
        timecodes: true
    });
    const song = queue.currentTrack;
    message.reply({
        embeds: [(0, _1.regularEmbed)()
                .setThumbnail(song.thumbnail)
                .setDescription(`Currently Playing **[${song.title}](${song.url})**\n\n` + bar)
                .setThumbnail(song.thumbnail)
        ]
    });
}
exports.nowplaying = nowplaying;
