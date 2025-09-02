"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_controller_1 = require("../controllers/order.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const validateRequest_1 = require("../middlewares/validateRequest");
const validation_1 = require("../utils/validation");
const router = (0, express_1.Router)();
const orderController = new order_controller_1.OrderController();
router.use(auth_middleware_1.authenticate);
router.get("/", orderController.getUserOrders);
router.get("/:id", orderController.getOrderById);
router.post("/", (0, validateRequest_1.validateRequest)(validation_1.createOrderSchema), orderController.createOrder);
router.use(auth_middleware_1.requireAdmin);
router.get("/admin/all", orderController.getAllOrders);
router.put("/:id/status", orderController.updateOrderStatus);
exports.default = router;
//# sourceMappingURL=orders.routes.js.map