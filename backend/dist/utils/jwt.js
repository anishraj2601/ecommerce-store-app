"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signRefreshToken = void 0;
exports.generateAccessToken = generateAccessToken;
exports.generateRefreshToken = generateRefreshToken;
exports.verifyRefreshToken = verifyRefreshToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
function generateAccessToken(payload) {
    return jsonwebtoken_1.default.sign(payload, config_1.config.JWT_SECRET, { expiresIn: "15m" });
}
function generateRefreshToken(payload) {
    return jsonwebtoken_1.default.sign(payload, config_1.config.JWT_REFRESH_SECRET, { expiresIn: "7d" });
}
exports.signRefreshToken = generateRefreshToken;
function verifyRefreshToken(token) {
    return jsonwebtoken_1.default.verify(token, config_1.config.JWT_REFRESH_SECRET);
}
//# sourceMappingURL=jwt.js.map