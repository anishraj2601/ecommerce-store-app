"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("../services/user.service");
class UserController {
    constructor() {
        this.getProfile = async (req, res, next) => {
            try {
                const userId = req.user.userId;
                const user = await this.userService.getUserProfile(userId);
                res.json(user);
            }
            catch (error) {
                next(error);
            }
        };
        this.updateProfile = async (req, res, next) => {
            try {
                const userId = req.user.userId;
                const user = await this.userService.updateUserProfile(userId, req.body);
                res.json({
                    message: "Profile updated successfully",
                    user,
                });
            }
            catch (error) {
                next(error);
            }
        };
        this.getAddresses = async (req, res, next) => {
            try {
                const userId = req.user.userId;
                const addresses = await this.userService.getUserAddresses(userId);
                res.json(addresses);
            }
            catch (error) {
                next(error);
            }
        };
        this.addAddress = async (req, res, next) => {
            try {
                const userId = req.user.userId;
                const address = await this.userService.addUserAddress(userId, req.body);
                res.status(201).json({
                    message: "Address added successfully",
                    address,
                });
            }
            catch (error) {
                next(error);
            }
        };
        this.userService = new user_service_1.UserService();
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map