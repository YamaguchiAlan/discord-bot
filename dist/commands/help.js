"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.help = void 0;
const _1 = require(".");
const commands = '**`help`**: Display a list of all commands\n' +
    '**`nowplaying`**: Shows info about the current song\n' +
    '**`pause`**: Pause the music\n' +
    '**`play <TITLE | URL>`**: Plays song from YouTube, Spotify or Soundcloud\n' +
    '**`playlist <YT_PLAYLIST_URL>`**: Add to the queue the songs from the YouTube playlist\n' +
    '**`prefix`**: Shows the current prefix\n' +
    '**`queue <PAGE_NUMBER> -optional`**: Shows the music queue and current song\n' +
    '**`quit`**: End the queue and leave the voice channel\n' +
    '**`remove <TRACK_NUMBER>`**: Remove a song from queue\n' +
    '**`resume`**: Resume the music\n' +
    '**`search <SEARCH_QUERY>`**: Make a search and shows the first 10 results\n' +
    '**`setprefix <NEW_PREFIX>`**: Set a new prefix for the bot, it must have a max of 3 characters\n' +
    '**`shuffle`**: Shuffles the current Queue\n' +
    '**`skip`**: Skip the currently playing song\n' +
    '**`skipto <TRACK_NUMBER>`**: Skip to the selected queue song\n' +
    '**`spotify_playlist <PLAYLIST_URL>`**: Add to the queue the songs from the Spotify playlist\n' +
    '**`volume <VOLUME>`**: Change volume. Enter a number from 0 to 100\n';
function help(message) {
    return message.reply({
        embeds: [
            (0, _1.noQueue)()
                .setTitle('Command List.')
                .setDescription(commands)
        ]
    });
}
exports.help = help;
