"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const pino_1 = __importDefault(require("pino"));
const config_1 = __importDefault(require("../config"));
exports.logger = (0, pino_1.default)({
    level: config_1.default.NODE_ENV === "production" ? "info" : "debug",
    transport: config_1.default.NODE_ENV === "development"
        ? {
            target: "pino-pretty",
            options: {
                colorize: true,
                ignore: "pid,hostname",
                translateTime: "SYS:standard",
            },
        }
        : undefined,
});
//# sourceMappingURL=logger.js.map