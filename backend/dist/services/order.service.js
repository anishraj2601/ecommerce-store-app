"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const order_repo_1 = require("../repositories/order.repo");
const product_service_1 = require("./product.service");
const cart_service_1 = require("./cart.service");
const error_middleware_1 = require("../middlewares/error.middleware");
class OrderService {
    constructor() {
        this.orderRepository = new order_repo_1.OrderRepository();
        this.productService = new product_service_1.ProductService();
        this.cartService = new cart_service_1.CartService();
    }
    async getUserOrders(userId, page = 1, limit = 10) {
        return await this.orderRepository.findByUserId(userId, page, limit);
    }
    async getOrderById(orderId, userId, userRole) {
        const order = await this.orderRepository.findById(orderId);
        if (!order) {
            throw (0, error_middleware_1.createError)("Order not found", 404);
        }
        if (order.userId !== userId && userRole !== "ADMIN") {
            throw (0, error_middleware_1.createError)("Unauthorized", 403);
        }
        return order;
    }
    async createOrder(userId, orderData) {
        const { items, shippingAddress, billingAddress } = orderData;
        let subtotal = 0;
        const orderItems = [];
        for (const item of items) {
            const product = await this.productService.getProductById(item.productId);
            if (!product) {
                throw (0, error_middleware_1.createError)(`Product not found: ${item.productId}`, 404);
            }
            if (product.inventory < item.quantity) {
                throw (0, error_middleware_1.createError)(`Insufficient inventory for ${product.title}`, 400);
            }
            const price = Number(product.salePrice ?? product.price ?? 0);
            subtotal += price * item.quantity;
            orderItems.push({
                productId: item.productId,
                quantity: item.quantity,
                priceSnapshot: price,
                productTitle: product.title,
                productImage: product.defaultImage ?? undefined,
            });
        }
        const shipping = subtotal > 100 ? 0 : 10;
        const tax = Number((subtotal * 0.08).toFixed(2));
        const total = Number((subtotal + shipping + tax).toFixed(2));
        const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        const order = await this.orderRepository.create({
            userId,
            orderNumber,
            subtotal,
            tax,
            shipping,
            total,
            shippingAddress,
            billingAddress: billingAddress || shippingAddress,
            items: orderItems,
        });
        for (const item of items) {
            await this.orderRepository.updateProductInventory(item.productId, item.quantity);
        }
        await this.cartService.clearCart(userId);
        return order;
    }
    async getAllOrders(page = 1, limit = 20, status) {
        return await this.orderRepository.findAll(page, limit, status);
    }
    async updateOrderStatus(orderId, status) {
        const order = await this.orderRepository.findById(orderId);
        if (!order) {
            throw (0, error_middleware_1.createError)("Order not found", 404);
        }
        return await this.orderRepository.updateStatus(orderId, status);
    }
    async updateOrder(orderId, payload) {
        const order = await this.orderRepository.findById(orderId);
        if (!order) {
            throw (0, error_middleware_1.createError)("Order not found", 404);
        }
        if (payload.status) {
            return await this.orderRepository.updateStatus(orderId, payload.status);
        }
        throw (0, error_middleware_1.createError)("No updatable fields provided", 400);
    }
}
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map