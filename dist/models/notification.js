"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = void 0;
const typegoose_1 = require("@typegoose/typegoose");
let Embed = class Embed {
};
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Embed.prototype, "title", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Boolean)
], Embed.prototype, "titleAsUrl", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Embed.prototype, "description", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Embed.prototype, "color", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Boolean)
], Embed.prototype, "previewImage", void 0);
Embed = __decorate([
    (0, typegoose_1.modelOptions)({
        schemaOptions: {
            _id: false
        }
    })
], Embed);
let Notification = exports.Notification = class Notification {
};
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Notification.prototype, "userId", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Notification.prototype, "guildId", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Notification.prototype, "twitchUsername", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, type: String }),
    __metadata("design:type", String)
], Notification.prototype, "twitchUserId", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Notification.prototype, "channel", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Notification.prototype, "channelName", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Notification.prototype, "message", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", Boolean)
], Notification.prototype, "embedMessage", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Embed)
], Notification.prototype, "embed", void 0);
exports.Notification = Notification = __decorate([
    (0, typegoose_1.modelOptions)({
        schemaOptions: {
            timestamps: true
        }
    })
], Notification);
const notificationModel = (0, typegoose_1.getModelForClass)(Notification);
exports.default = notificationModel;
