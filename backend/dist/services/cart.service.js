"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const cart_repo_1 = require("../repositories/cart.repo");
const product_service_1 = require("./product.service");
const error_middleware_1 = require("../middlewares/error.middleware");
class CartService {
    constructor() {
        this.cartRepository = new cart_repo_1.CartRepository();
        this.productService = new product_service_1.ProductService();
    }
    async getCart(userId, sessionId) {
        if (!userId && !sessionId) {
            throw (0, error_middleware_1.createError)("User ID or session ID required", 400);
        }
        const cartItems = await this.cartRepository.findByUserOrSession(userId, sessionId);
        const total = cartItems.reduce((sum, item) => {
            return sum + Number(item.priceSnapshot) * item.quantity;
        }, 0);
        return {
            items: cartItems,
            total,
            itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
        };
    }
    async addToCart(data) {
        const { userId, sessionId, productId, quantity } = data;
        if (!userId && !sessionId) {
            throw (0, error_middleware_1.createError)("User ID or session ID required", 400);
        }
        if (quantity <= 0) {
            throw (0, error_middleware_1.createError)("Quantity must be greater than 0", 400);
        }
        const product = await this.productService.getProductById(productId);
        if (!product) {
            throw (0, error_middleware_1.createError)("Product not found", 404);
        }
        if (typeof product.inventory === "number" && product.inventory < quantity) {
            throw (0, error_middleware_1.createError)(`Only ${product.inventory} items left in stock`, 400);
        }
        const existingItem = await this.cartRepository.findByProductAndUser(productId, userId, sessionId);
        if (existingItem) {
            const newQuantity = existingItem.quantity + quantity;
            return await this.cartRepository.updateQuantity(existingItem.id, newQuantity);
        }
        else {
            return await this.cartRepository.create({
                userId,
                sessionId,
                productId,
                quantity,
                priceSnapshot: Number(product.salePrice ?? product.price ?? 0),
            });
        }
    }
    async updateCartItem(itemId, quantity, userId) {
        if (quantity <= 0) {
            throw (0, error_middleware_1.createError)("Quantity must be greater than 0", 400);
        }
        const cartItem = await this.cartRepository.findById(itemId);
        if (!cartItem) {
            throw (0, error_middleware_1.createError)("Cart item not found", 404);
        }
        if (userId && cartItem.userId !== userId) {
            throw (0, error_middleware_1.createError)("Unauthorized", 403);
        }
        return await this.cartRepository.updateQuantity(itemId, quantity);
    }
    async removeFromCart(itemId, userId) {
        const cartItem = await this.cartRepository.findById(itemId);
        if (!cartItem) {
            throw (0, error_middleware_1.createError)("Cart item not found", 404);
        }
        if (userId && cartItem.userId !== userId) {
            throw (0, error_middleware_1.createError)("Unauthorized", 403);
        }
        return await this.cartRepository.delete(itemId);
    }
    async mergeGuestCart(userId, sessionId) {
        if (!userId) {
            throw (0, error_middleware_1.createError)("User ID required to merge cart", 400);
        }
        if (!sessionId) {
            return await this.getCart(userId);
        }
        const guestItems = await this.cartRepository.findByUserOrSession(undefined, sessionId);
        for (const guestItem of guestItems) {
            await this.addToCart({
                userId,
                productId: guestItem.productId,
                quantity: guestItem.quantity,
            });
        }
        await this.cartRepository.deleteBySession(sessionId);
        return await this.getCart(userId);
    }
    async clearCart(userId, sessionId) {
        if (!userId && !sessionId) {
            throw (0, error_middleware_1.createError)("User ID or session ID required", 400);
        }
        if (userId) {
            return await this.cartRepository.deleteByUser(userId);
        }
        else {
            return await this.cartRepository.deleteBySession(sessionId);
        }
    }
}
exports.CartService = CartService;
//# sourceMappingURL=cart.service.js.map