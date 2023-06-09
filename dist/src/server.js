"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const index_routes_1 = __importDefault(require("../routes/index.routes"));
const app = (0, express_1.default)();
// Setting
app.set('port', process.env.PORT || 443);
// Middlewares
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
const corsOpt = {
    origin: true,
    credentials: true
};
app.use((0, cors_1.default)(corsOpt));
// Routes
app.use(index_routes_1.default);
exports.default = app;
