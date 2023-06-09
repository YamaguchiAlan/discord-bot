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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.botLogin = void 0;
const discord_js_1 = require("discord.js");
const discord_player_1 = require("discord-player");
const extractor_1 = require("@discord-player/extractor");
const types_1 = require("../types");
const commands_1 = require("../commands");
const server_1 = __importDefault(require("../models/server"));
const botToken = process.env.BOT_TOKEN;
const client = new discord_js_1.Client({
    intents: [discord_js_1.GatewayIntentBits.Guilds, discord_js_1.GatewayIntentBits.GuildMessages, discord_js_1.GatewayIntentBits.MessageContent,
        discord_js_1.GatewayIntentBits.GuildPresences, discord_js_1.GatewayIntentBits.GuildMembers, discord_js_1.GatewayIntentBits.GuildVoiceStates]
});
const defaultPrefix = '$';
function botLogin() {
    client.login(botToken);
}
exports.botLogin = botLogin;
const cookie = process.env.COOKIE;
// Discord Player
const player = new discord_player_1.Player(client, {
    ytdlOptions: {
        quality: 'highestaudio',
        highWaterMark: 1 << 25,
        requestOptions: {
            Headers: {
                cookie
            }
        }
    }
});
player.extractors.register(extractor_1.YouTubeExtractor, {});
player.extractors.register(extractor_1.SpotifyExtractor, {});
player.extractors.register(extractor_1.AppleMusicExtractor, {});
player.extractors.register(extractor_1.SoundCloudExtractor, {});
// Message event
client.on('messageCreate', (message) => __awaiter(void 0, void 0, void 0, function* () {
    if (message.author.bot)
        return;
    if (!message.guild)
        return;
    let server = yield server_1.default.findOne({ server_id: message.guildId }, 'prefix');
    if (!server) {
        server = yield new server_1.default({ server_id: message.guildId });
        yield server.save();
    }
    if (!(server === null || server === void 0 ? void 0 : server.prefix)) {
        server.prefix = defaultPrefix;
        yield server.save();
    }
    const prefix = server.prefix;
    if (!message.content.startsWith(prefix))
        return;
    const [CMD_NAME, ...args] = message.content.trim().substring(prefix.length).split(/\s+/);
    if (CMD_NAME === types_1.Commands.PLAY && args[0]) {
        (0, commands_1.play)(args, message, types_1.PlayCommandActions.SEARCH);
    }
    else if (CMD_NAME === types_1.Commands.PLAYLIST && args[0] && !args[1]) {
        (0, commands_1.play)(args, message, types_1.PlayCommandActions.PLAYLIST);
    }
    else if (CMD_NAME === types_1.Commands.SPOTIFY_PLAYLIST && args[0] && !args[1]) {
        (0, commands_1.play)(args, message, types_1.PlayCommandActions.SPOTIFY_PLAYLIST);
    }
    else if (CMD_NAME === types_1.Commands.QUEUE && !args[1]) {
        (0, commands_1.queue)(args, message);
    }
    else if (CMD_NAME === types_1.Commands.QUIT && !args[0]) {
        (0, commands_1.quit)(message);
    }
    else if (CMD_NAME === types_1.Commands.SHUFFLE && !args[0]) {
        (0, commands_1.shuffle)(message);
    }
    else if (CMD_NAME === types_1.Commands.NOWPLAYING && !args[0]) {
        (0, commands_1.nowplaying)(message);
    }
    else if (CMD_NAME === types_1.Commands.PAUSE && !args[0]) {
        (0, commands_1.pause)(message);
    }
    else if (CMD_NAME === types_1.Commands.RESUME && !args[0]) {
        (0, commands_1.resume)(message);
    }
    else if (CMD_NAME === types_1.Commands.SKIP && !args[0]) {
        (0, commands_1.skip)(message);
    }
    else if (CMD_NAME === types_1.Commands.SKIPTO && args[0] && !args[1]) {
        (0, commands_1.skipto)(args, message);
    }
    else if (CMD_NAME === types_1.Commands.REMOVE && args[0] && !args[1]) {
        (0, commands_1.remove)(args, message);
    }
    else if (CMD_NAME === types_1.Commands.SEARCH && args[0]) {
        (0, commands_1.search)(args, message);
    }
    else if (CMD_NAME === types_1.Commands.VOLUME && args[0] && !args[1]) {
        (0, commands_1.volume)(args, message);
    }
    else if (CMD_NAME === types_1.Commands.SETPREFIX && args[0] && !args[1]) {
        (0, commands_1.setprefix)(args, message, server);
    }
    else if (CMD_NAME === types_1.Commands.PREFIX && !args[0]) {
        (0, commands_1.viewPrefix)(prefix, message);
    }
    else if (CMD_NAME === types_1.Commands.HELP && !args[1]) {
        (0, commands_1.help)(message);
    }
}));
exports.default = client;
