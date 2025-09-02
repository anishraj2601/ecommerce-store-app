"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const validateRequest_1 = require("../middlewares/validateRequest");
const validation_1 = require("../utils/validation");
const router = (0, express_1.Router)();
const userController = new user_controller_1.UserController();
router.use(auth_middleware_1.authenticate);
router.get("/profile", userController.getProfile);
router.put("/profile", userController.updateProfile);
router.get("/addresses", userController.getAddresses);
router.post("/addresses", (0, validateRequest_1.validateRequest)(validation_1.addressSchema), userController.addAddress);
exports.default = router;
//# sourceMappingURL=users.routes.js.map