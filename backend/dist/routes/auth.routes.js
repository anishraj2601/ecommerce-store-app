"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const rateLimiter_1 = require("../middlewares/rateLimiter");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const validateRequest_1 = require("../middlewares/validateRequest");
const validation_1 = require("../utils/validation");
const router = (0, express_1.Router)();
const authController = new auth_controller_1.AuthController();
router.use(rateLimiter_1.authLimiter);
router.post("/register", (0, validateRequest_1.validateRequest)(validation_1.registerSchema), authController.register);
router.post("/login", (0, validateRequest_1.validateRequest)(validation_1.loginSchema), authController.login);
router.post("/refresh", authController.refresh);
router.post("/logout", auth_middleware_1.authenticate, authController.logout);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map