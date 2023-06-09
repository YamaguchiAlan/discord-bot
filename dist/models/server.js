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
exports.Server = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const notification_1 = require("./notification");
let Server = exports.Server = class Server {
};
__decorate([
    (0, typegoose_1.prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], Server.prototype, "server_id", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => notification_1.Notification }),
    __metadata("design:type", Array)
], Server.prototype, "notifications", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: '$', maxlength: 3 }),
    __metadata("design:type", String)
], Server.prototype, "prefix", void 0);
exports.Server = Server = __decorate([
    (0, typegoose_1.modelOptions)({
        schemaOptions: {
            timestamps: true
        }
    })
], Server);
const ServerModel = (0, typegoose_1.getModelForClass)(Server);
exports.default = ServerModel;
