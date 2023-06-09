"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_twitch_1 = __importDefault(require("node-twitch"));
const twitch = new node_twitch_1.default({
    client_id: process.env.APP_CLIENT_ID,
    client_secret: process.env.APP_SECRET_TOKEN
});
exports.default = twitch;
