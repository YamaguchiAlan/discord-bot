"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prefix = void 0;
const _1 = require(".");
function prefix(prefix, message) {
    return message.reply({
        embeds: [
            (0, _1.noQueue)()
                .setTitle('Current prefix: `' + prefix + '`')
        ]
    });
}
exports.prefix = prefix;
