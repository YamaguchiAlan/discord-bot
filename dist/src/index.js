"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const bot_1 = require("./bot");
const database_1 = __importDefault(require("./database"));
const server_1 = __importDefault(require("./server"));
(0, bot_1.botLogin)();
(0, database_1.default)();
server_1.default.listen(server_1.default.get('port'), () => {
    console.log(`Server on port ${server_1.default.get('port')}`);
});
