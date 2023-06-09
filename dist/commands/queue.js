"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queue = void 0;
const _1 = require(".");
const discord_player_1 = require("discord-player");
function queue(args, message) {
    var _a;
    const embed = (0, _1.regularEmbed)();
    const error = (0, _1.errorEmbed)();
    const player = (0, discord_player_1.useMasterPlayer)();
    const queue = player.nodes.get(message.guildId);
    if (!queue || queue.isEmpty()) {
        return message.reply({ embeds: [(0, _1.noQueue)()] });
    }
    const totalPages = Math.ceil(queue.getSize() / 10) || 1;
    const page = (parseInt(args[0]) || 1) - 1;
    if ((page + 1) > totalPages || page < 0) {
        error.setTitle(`Invalid Page. There are only ${totalPages} pages of songs`);
        return message.reply({ embeds: [error] });
    }
    const queueString = queue.tracks.data.slice(page * 10, page * 10 + 10).map((song, i) => {
        var _a;
        return `**${page * 10 + i + 1}.** \`[${song.duration}]\` [${song.title}](${song.url}) -- <@${(_a = song.requestedBy) === null || _a === void 0 ? void 0 : _a.id}>`;
    }).join('\n');
    const currentSong = queue.currentTrack;
    embed
        .setDescription('**Currently Playing**\n' +
        (currentSong ? `\`[${currentSong.duration}]\` [${currentSong.title}](${currentSong.url}) -- <@${(_a = currentSong.requestedBy) === null || _a === void 0 ? void 0 : _a.id}>` : 'None') +
        `\n\n**Queue**\n${queueString}`)
        .setFooter({
        text: `Page ${page + 1} of ${totalPages}`
    })
        .setThumbnail(currentSong.thumbnail);
    message.reply({
        embeds: [embed]
    });
}
exports.queue = queue;
