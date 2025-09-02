"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
const error_middleware_1 = require("../middlewares/error.middleware");
class AuthController {
    constructor() {
        this.register = async (req, res, next) => {
            try {
                const { email, password, name } = req.body;
                const result = await this.authService.register({ email, password, name });
                res.status(201).json({
                    message: "User registered successfully",
                    user: result.user,
                    tokens: result.tokens,
                });
            }
            catch (error) {
                next(error);
            }
        };
        this.login = async (req, res, next) => {
            try {
                const { email, password } = req.body;
                const result = await this.authService.login({ email, password });
                res.cookie("refreshToken", result.tokens.refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                });
                res.json({
                    message: "Login successful",
                    user: result.user,
                    accessToken: result.tokens.accessToken,
                });
            }
            catch (error) {
                next(error);
            }
        };
        this.refresh = async (req, res, next) => {
            try {
                const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
                if (!refreshToken) {
                    throw (0, error_middleware_1.createError)("Refresh token required", 401);
                }
                const result = await this.authService.refreshToken(refreshToken);
                res.cookie("refreshToken", result.tokens.refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                });
                res.json({
                    message: "Token refreshed successfully",
                    user: result.user,
                    accessToken: result.tokens.accessToken,
                });
            }
            catch (error) {
                next(error);
            }
        };
        this.logout = async (req, res, next) => {
            try {
                res.clearCookie("refreshToken");
                res.json({
                    message: "Logout successful",
                });
            }
            catch (error) {
                next(error);
            }
        };
        this.authService = new auth_service_1.AuthService();
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map