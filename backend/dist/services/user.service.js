"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_repo_1 = require("../repositories/user.repo");
const error_middleware_1 = require("../middlewares/error.middleware");
class UserService {
    constructor() {
        this.userRepository = new user_repo_1.UserRepository();
    }
    async getUserProfile(userId) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw (0, error_middleware_1.createError)("User not found", 404);
        }
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            createdAt: user.createdAt,
        };
    }
    async updateUserProfile(userId, data) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw (0, error_middleware_1.createError)("User not found", 404);
        }
        if (data.email && data.email !== user.email) {
            const existingUser = await this.userRepository.findByEmail(data.email);
            if (existingUser) {
                throw (0, error_middleware_1.createError)("Email already in use", 409);
            }
        }
        const updatedUser = await this.userRepository.update(userId, data);
        return {
            id: updatedUser.id,
            email: updatedUser.email,
            name: updatedUser.name,
            role: updatedUser.role,
        };
    }
    async getUserAddresses(userId) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw (0, error_middleware_1.createError)("User not found", 404);
        }
        return user.addresses;
    }
    async addUserAddress(userId, addressData) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw (0, error_middleware_1.createError)("User not found", 404);
        }
        const isFirstAddress = user.addresses.length === 0;
        const isDefault = addressData.isDefault || isFirstAddress;
        if (isDefault) {
            await this.userRepository.unsetDefaultAddresses(userId);
        }
        return await this.userRepository.addAddress(userId, {
            ...addressData,
            isDefault,
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map