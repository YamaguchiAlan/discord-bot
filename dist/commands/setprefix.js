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
exports.setprefix = void 0;
const _1 = require(".");
function setprefix(args, message, Server) {
    return __awaiter(this, void 0, void 0, function* () {
        const newPrefix = args[0];
        if (newPrefix.length > 3) {
            return message.reply({
                embeds: [(0, _1.errorEmbed)().setTitle('Invalid prefix. The prefix must have a max of 3 characters')]
            });
        }
        if (newPrefix === Server.prefix) {
            return message.reply({
                embeds: [(0, _1.errorEmbed)().setTitle('The prefix `' + newPrefix + '` is the current prefix')]
            });
        }
        Server.prefix = newPrefix;
        yield Server.save();
        message.reply({
            embeds: [
                (0, _1.noQueue)()
                    .setTitle('Prefix changed to `' + newPrefix + '`')
            ]
        });
    });
}
exports.setprefix = setprefix;
