"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const order_service_1 = require("../services/order.service");
class OrderController {
    constructor() {
        this.getUserOrders = async (req, res, next) => {
            try {
                const userId = req.user.userId;
                const page = req.query.page ? Number(req.query.page) : 1;
                const limit = req.query.limit ? Number(req.query.limit) : 10;
                const orders = await this.orderService.getUserOrders(userId, page, limit);
                res.json(orders);
            }
            catch (error) {
                next(error);
            }
        };
        this.getOrderById = async (req, res, next) => {
            try {
                const { id } = req.params;
                const userId = req.user.userId;
                const userRole = req.user.role;
                const order = await this.orderService.getOrderById(id, userId ?? "", userRole ?? "");
                res.json(order);
            }
            catch (error) {
                next(error);
            }
        };
        this.createOrder = async (req, res, next) => {
            try {
                const userId = req.user.userId;
                const orderData = req.body;
                const order = await this.orderService.createOrder(userId, orderData);
                res.status(201).json({
                    message: "Order created successfully",
                    order,
                });
            }
            catch (error) {
                next(error);
            }
        };
        this.getAllOrders = async (req, res, next) => {
            try {
                const page = req.query.page ? Number(req.query.page) : 1;
                const limit = req.query.limit ? Number(req.query.limit) : 20;
                const status = req.query.status;
                const orders = await this.orderService.getAllOrders(page, limit, status);
                res.json(orders);
            }
            catch (error) {
                next(error);
            }
        };
        this.updateOrderStatus = async (req, res, next) => {
            try {
                const { id } = req.params;
                const { status } = req.body;
                const order = await this.orderService.updateOrderStatus(id, status);
                res.json({
                    message: "Order status updated successfully",
                    order,
                });
            }
            catch (error) {
                next(error);
            }
        };
        this.orderService = new order_service_1.OrderService();
    }
}
exports.OrderController = OrderController;
//# sourceMappingURL=order.controller.js.map