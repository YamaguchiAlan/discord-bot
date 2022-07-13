import { Client } from 'discord.js'
import { Player } from 'discord-player'

export interface DiscordClient extends Client {
    player: Player
}

export enum Commands {
    'PLAY' = 'play',
    'PLAYLIST' = 'playlist',
    'SPOTIFY_PLAYLIST' = 'spotify_playlist',
    'PLAY_PLAYLIST' = 'play_playlist',
    'QUEUE' = 'queue',
    'QUIT' = 'quit',
    'SHUFFLE' = 'shuffle',
    'NOWPLAYING' = 'nowplaying',
    'PAUSE' = 'pause',
    'RESUME' = 'resume',
    'SKIP' = 'skip',
    'SKIPTO' = 'skipto',
    'REMOVE' = 'remove',
    'SEARCH' = 'search',
    'VOLUME' = 'volume',
    'SETPREFIX' = 'setprefix',
    'PREFIX' = 'prefix',
    'HELP' = 'help'
}

export enum PlayCommandActions { 'SEARCH', 'PLAYLIST', 'SPOTIFY_PLAYLIST'}
