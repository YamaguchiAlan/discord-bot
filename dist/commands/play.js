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
Object.defineProperty(exports, "__esModule", { value: true });
exports.play = void 0;
const discord_player_1 = require("discord-player");
const types_1 = require("../types");
const _1 = require(".");
function play(args, message, action) {
    return __awaiter(this, void 0, void 0, function* () {
        const embed = (0, _1.regularEmbed)();
        const error = (0, _1.errorEmbed)();
        const player = (0, discord_player_1.useMasterPlayer)();
        if (!message.member.voice.channel) {
            error.setTitle('You need to be in a Voice Channel to use this command');
            return message.reply({
                embeds: [error]
            });
        }
        const queue = player.nodes.create(message.guild, {
            metadata: {
                channel: message.channel
            }
        });
        try {
            if (!queue.connection)
                yield queue.connect(message.member.voice.channel);
        }
        catch (_a) {
            queue.delete();
            error.setTitle('Could not join your voice channel!');
            return message.reply({
                embeds: [error]
            });
        }
        const query = args.join(' ');
        if (action === types_1.PlayCommandActions.SEARCH) {
            const result = yield player.search(query, {
                requestedBy: message.author,
                searchEngine: discord_player_1.QueryType.AUTO
            });
            if (result.tracks.length === 0) {
                error.setTitle(`Track **${query}** not found!`);
                if (queue.isEmpty() && !queue.node.isPlaying()) {
                    queue.delete();
                }
                return message.reply({
                    embeds: [error]
                });
            }
            const song = result.tracks[0];
            yield queue.addTrack(song);
            embed
                .setDescription(`**[${song.title}](${song.url})** has been added to the Queue`)
                .setThumbnail(song.thumbnail)
                .setFooter({ text: `Duration: ${song.duration}` });
        }
        else if (action === types_1.PlayCommandActions.PLAYLIST) {
            const result = yield player.search(query, {
                requestedBy: message.author,
                searchEngine: discord_player_1.QueryType.YOUTUBE_PLAYLIST
            });
            if (result.tracks.length === 0) {
                error.setTitle('Playlist not found!');
                if (queue.isEmpty() && !queue.node.isPlaying()) {
                    queue.delete();
                }
                return message.reply({
                    embeds: [error]
                });
            }
            const playlist = result.playlist;
            yield queue.addTrack(result.tracks);
            embed
                .setDescription(`**${result.tracks.length} songs from [${playlist.title}](${playlist.url})** have been added to the Queue`)
                .setThumbnail(playlist.thumbnail);
        }
        else if (action === types_1.PlayCommandActions.SPOTIFY_PLAYLIST) {
            try {
                const result = yield player.search(query, {
                    requestedBy: message.author,
                    searchEngine: discord_player_1.QueryType.SPOTIFY_PLAYLIST
                });
                if (result.tracks.length === 0) {
                    error.setTitle('Playlist not found!');
                    if (queue.isEmpty() && !queue.node.isPlaying()) {
                        queue.delete();
                    }
                    return message.reply({
                        embeds: [error]
                    });
                }
                const playlist = result.playlist;
                yield queue.addTrack(result.tracks);
                embed
                    .setDescription(`**${result.tracks.length} songs from [${playlist.title}](${playlist.url})** have been added to the Queue`)
                    .setThumbnail(playlist.thumbnail);
            }
            catch (err) {
                error.setTitle('Playlist not found!');
                if (queue.isEmpty() && !queue.node.isPlaying()) {
                    queue.delete();
                }
                return message.reply({
                    embeds: [error]
                });
            }
        }
        if (!queue.node.isPlaying())
            yield queue.node.play();
        message.reply({
            embeds: [embed]
        });
    });
}
exports.play = play;
