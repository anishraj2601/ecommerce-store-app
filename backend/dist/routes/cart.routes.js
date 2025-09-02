"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cart_controller_1 = require("../controllers/cart.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const validateRequest_1 = require("../middlewares/validateRequest");
const validation_1 = require("../utils/validation");
const router = (0, express_1.Router)();
const cartController = new cart_controller_1.CartController();
router.get("/", cartController.getCart);
router.post("/", (0, validateRequest_1.validateRequest)(validation_1.addToCartSchema), cartController.addToCart);
router.put("/:itemId", cartController.updateCartItem);
router.delete("/:itemId", cartController.removeFromCart);
router.post("/merge", auth_middleware_1.authenticate, cartController.mergeCart);
exports.default = router;
//# sourceMappingURL=cart.routes.js.map