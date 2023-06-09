"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.noQueue = exports.errorEmbed = exports.regularEmbed = exports.help = exports.viewPrefix = exports.setprefix = exports.volume = exports.search = exports.remove = exports.skipto = exports.skip = exports.resume = exports.pause = exports.nowplaying = exports.shuffle = exports.quit = exports.queue = exports.play = void 0;
const discord_js_1 = require("discord.js");
const bot_1 = __importDefault(require("../src/bot"));
const play_1 = require("./play");
Object.defineProperty(exports, "play", { enumerable: true, get: function () { return play_1.play; } });
const queue_1 = require("./queue");
Object.defineProperty(exports, "queue", { enumerable: true, get: function () { return queue_1.queue; } });
const quit_1 = require("./quit");
Object.defineProperty(exports, "quit", { enumerable: true, get: function () { return quit_1.quit; } });
const shuffle_1 = require("./shuffle");
Object.defineProperty(exports, "shuffle", { enumerable: true, get: function () { return shuffle_1.shuffle; } });
const nowplaying_1 = require("./nowplaying");
Object.defineProperty(exports, "nowplaying", { enumerable: true, get: function () { return nowplaying_1.nowplaying; } });
const pause_1 = require("./pause");
Object.defineProperty(exports, "pause", { enumerable: true, get: function () { return pause_1.pause; } });
const resume_1 = require("./resume");
Object.defineProperty(exports, "resume", { enumerable: true, get: function () { return resume_1.resume; } });
const skip_1 = require("./skip");
Object.defineProperty(exports, "skip", { enumerable: true, get: function () { return skip_1.skip; } });
const skipto_1 = require("./skipto");
Object.defineProperty(exports, "skipto", { enumerable: true, get: function () { return skipto_1.skipto; } });
const remove_1 = require("./remove");
Object.defineProperty(exports, "remove", { enumerable: true, get: function () { return remove_1.remove; } });
const search_1 = require("./search");
Object.defineProperty(exports, "search", { enumerable: true, get: function () { return search_1.search; } });
const volume_1 = require("./volume");
Object.defineProperty(exports, "volume", { enumerable: true, get: function () { return volume_1.volume; } });
const setprefix_1 = require("./setprefix");
Object.defineProperty(exports, "setprefix", { enumerable: true, get: function () { return setprefix_1.setprefix; } });
const prefix_1 = require("./prefix");
Object.defineProperty(exports, "viewPrefix", { enumerable: true, get: function () { return prefix_1.prefix; } });
const help_1 = require("./help");
Object.defineProperty(exports, "help", { enumerable: true, get: function () { return help_1.help; } });
const regularEmbed = () => {
    var _a, _b;
    return (new discord_js_1.EmbedBuilder()
        .setColor('#0ec9a6')
        .setAuthor({ name: 'Yamabot', iconURL: `https://cdn.discordapp.com/avatars/${(_a = bot_1.default.user) === null || _a === void 0 ? void 0 : _a.id}/${(_b = bot_1.default.user) === null || _b === void 0 ? void 0 : _b.avatar}.webp?size=100` }));
};
exports.regularEmbed = regularEmbed;
const errorEmbed = () => (new discord_js_1.EmbedBuilder()
    .setColor('DarkRed')
    .setFooter({ text: '- Yamabot' }));
exports.errorEmbed = errorEmbed;
const noQueue = () => (new discord_js_1.EmbedBuilder()
    .setColor('#0ec9a6')
    .setTitle('There are no songs in the queue')
    .setFooter({ text: '- Yamabot' }));
exports.noQueue = noQueue;
