"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_repo_1 = require("../repositories/user.repo");
const jwt_1 = require("../utils/jwt");
const error_middleware_1 = require("../middlewares/error.middleware");
const config_1 = __importDefault(require("../config"));
class AuthService {
    constructor() {
        this.userRepository = new user_repo_1.UserRepository();
    }
    async register(userData) {
        const existingUser = await this.userRepository.findByEmail(userData.email);
        if (existingUser) {
            throw (0, error_middleware_1.createError)("User with this email already exists", 409);
        }
        const passwordHash = await bcrypt_1.default.hash(userData.password, config_1.default.BCRYPT_ROUNDS);
        const user = await this.userRepository.create({
            email: userData.email,
            passwordHash,
            name: userData.name,
        });
        const tokenPayload = {
            userId: user.id,
            email: user.email,
            role: user.role,
        };
        const accessToken = (0, jwt_1.generateAccessToken)(tokenPayload);
        const refreshToken = (0, jwt_1.generateRefreshToken)(tokenPayload);
        return {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
            tokens: {
                accessToken,
                refreshToken,
            },
        };
    }
    async login(credentials) {
        const user = await this.userRepository.findByEmail(credentials.email);
        if (!user) {
            throw (0, error_middleware_1.createError)("Invalid email or password", 401);
        }
        const isPasswordValid = await bcrypt_1.default.compare(credentials.password, user.passwordHash);
        if (!isPasswordValid) {
            throw (0, error_middleware_1.createError)("Invalid email or password", 401);
        }
        const tokenPayload = {
            userId: user.id,
            email: user.email,
            role: user.role,
        };
        const accessToken = (0, jwt_1.generateAccessToken)(tokenPayload);
        const refreshToken = (0, jwt_1.generateRefreshToken)(tokenPayload);
        return {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
            tokens: {
                accessToken,
                refreshToken,
            },
        };
    }
    async refreshToken(refreshToken) {
        try {
            const payload = (0, jwt_1.verifyRefreshToken)(refreshToken);
            if (typeof payload !== "object" ||
                payload === null ||
                !("userId" in payload)) {
                throw new Error("Invalid token payload");
            }
            const user = await this.userRepository.findById(payload.userId);
            if (!user) {
                throw (0, error_middleware_1.createError)("User not found", 404);
            }
            const tokenPayload = {
                userId: user.id,
                email: user.email,
                role: user.role,
            };
            const accessToken = (0, jwt_1.generateAccessToken)(tokenPayload);
            const newRefreshToken = (0, jwt_1.generateRefreshToken)(tokenPayload);
            return {
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                },
                tokens: {
                    accessToken,
                    refreshToken: newRefreshToken,
                },
            };
        }
        catch (error) {
            throw (0, error_middleware_1.createError)("Invalid or expired refresh token", 401);
        }
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map