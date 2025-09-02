"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartController = void 0;
const cart_service_1 = require("../services/cart.service");
class CartController {
    constructor() {
        this.getCart = async (req, res, next) => {
            try {
                const userId = req.user?.userId;
                const sessionId = req.headers["x-session-id"];
                const cart = await this.cartService.getCart(userId, sessionId);
                res.json(cart);
            }
            catch (error) {
                next(error);
            }
        };
        this.addToCart = async (req, res, next) => {
            try {
                const userId = req.user?.userId;
                const sessionId = req.headers["x-session-id"];
                const { productId, quantity } = req.body;
                const cartItem = await this.cartService.addToCart({
                    userId,
                    sessionId,
                    productId,
                    quantity,
                });
                res.status(201).json({
                    message: "Item added to cart",
                    cartItem,
                });
            }
            catch (error) {
                next(error);
            }
        };
        this.updateCartItem = async (req, res, next) => {
            try {
                const { itemId } = req.params;
                const { quantity } = req.body;
                const userId = req.user?.userId;
                const cartItem = await this.cartService.updateCartItem(itemId, quantity, userId);
                res.json({
                    message: "Cart item updated",
                    cartItem,
                });
            }
            catch (error) {
                next(error);
            }
        };
        this.removeFromCart = async (req, res, next) => {
            try {
                const { itemId } = req.params;
                const userId = req.user?.userId;
                await this.cartService.removeFromCart(itemId, userId);
                res.json({
                    message: "Item removed from cart",
                });
            }
            catch (error) {
                next(error);
            }
        };
        this.mergeCart = async (req, res, next) => {
            try {
                const userId = req.user.userId;
                const sessionId = req.headers["x-session-id"];
                const cart = await this.cartService.mergeGuestCart(userId, sessionId);
                res.json({
                    message: "Cart merged successfully",
                    cart,
                });
            }
            catch (error) {
                next(error);
            }
        };
        this.cartService = new cart_service_1.CartService();
    }
}
exports.CartController = CartController;
//# sourceMappingURL=cart.controller.js.map