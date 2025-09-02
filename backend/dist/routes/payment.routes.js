"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payment_controller_1 = __importDefault(require("../controllers/payment.controller"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.post("/create-intent", auth_middleware_1.authenticate, payment_controller_1.default.createPaymentIntent);
router.post("/confirm", auth_middleware_1.authenticate, payment_controller_1.default.confirmPayment);
exports.default = router;
//# sourceMappingURL=payment.routes.js.map