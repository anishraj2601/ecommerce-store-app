// src/services/cart.service.ts
import { CartRepository } from "../repositories/cart.repo";
import { ProductService } from "./product.service";
import { createError } from "../middlewares/error.middleware";
import { prisma } from "../../../prisma";

/**
 * CartService - handles cart operations. Methods throw on invalid input
 * and always return a defined value (no code path falls through).
 */
export class CartService {
  // Use property initializers for more concise code
  private cartRepository = new CartRepository();
  private productService = new ProductService();

  /**
   * Get cart by userId or sessionId. One of them is required.
   */
  async getCart(userId?: string, sessionId?: string) {
    if (!userId && !sessionId) {
      throw createError("User ID or session ID required", 400);
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

  /**
   * Add a product to cart. If item exists, increments quantity.
   * Returns the created/updated cart item.
   */
  async addToCart(data: {
    userId?: string;
    sessionId?: string;
    productId: string;
    quantity: number;
  },
  tx?: any
  ) {
    const { userId, sessionId, productId, quantity } = data;

    if (!userId && !sessionId) {
      throw createError("User ID or session ID required", 400);
    }

    if (quantity <= 0) {
      throw createError("Quantity must be greater than 0", 400);
    }

    // Get product to verify it exists and get current price
    const product = await this.productService.getProductById(productId);
    if (!product) {
      throw createError("Product not found", 404);
    }

    // Optional: prevent adding more than available inventory
    if (typeof product.inventory === "number" && product.inventory < quantity) {
      throw createError(`Only ${product.inventory} items left in stock`, 400);
    }

    // Check if item already exists in cart
    const existingItem = await this.cartRepository.findByProductAndUser(
      productId,
      userId,
      sessionId,
      tx
    );

    if (existingItem) {
      // Update quantity
      const newQuantity = existingItem.quantity + quantity;
      return await this.cartRepository.updateQuantity(existingItem.id, newQuantity, tx);
    } else {
      // Create new cart item
      return await this.cartRepository.create({
        userId,
        sessionId,
        productId,
        quantity,
        priceSnapshot: Number(product.salePrice ?? product.price ?? 0),
      }, tx
      );
    }
  }

  /**
   * Update quantity for an existing cart item.
   */
  async updateCartItem(itemId: string, quantity: number, userId?: string) {
    if (quantity <= 0) {
      throw createError("Quantity must be greater than 0", 400);
    }

    const cartItem = await this.cartRepository.findById(itemId);
    if (!cartItem) {
      throw createError("Cart item not found", 404);
    }

    // Verify ownership
    if (userId && cartItem.userId !== userId) {
      throw createError("Unauthorized", 403);
    }

    return await this.cartRepository.updateQuantity(itemId, quantity);
  }

  /**
   * Remove an item from cart.
   */
  async removeFromCart(itemId: string, userId?: string) {
    const cartItem = await this.cartRepository.findById(itemId);
    if (!cartItem) {
      throw createError("Cart item not found", 404);
    }

    // Verify ownership
    if (userId && cartItem.userId !== userId) {
      throw createError("Unauthorized", 403);
    }

    return await this.cartRepository.delete(itemId);
  }

  /**
   * Merge a guest (session) cart into a user's cart on login/registration.
   * Returns the merged cart for the user.
   */
  async mergeGuestCart(userId: string, sessionId?: string) {
    if (!userId) {
      throw createError("User ID required to merge cart", 400);
    }

    if (!sessionId) {
      // nothing to merge, just return user's current cart
      return await this.getCart(userId);
    }

    // Use a transaction to ensure the merge is atomic.
    // If any step fails, the entire operation is rolled back.
    await prisma.$transaction(async (tx) => {
      // Get guest cart items using the transaction client
      const guestItems = await this.cartRepository.findByUserOrSession(
        undefined,
        sessionId,
        tx
      );

      // Merge each guest item into the user's cart
      for (const guestItem of guestItems) {
        // Pass the transaction client to addToCart
        await this.addToCart(
          {
            userId,
            productId: guestItem.productId,
            quantity: guestItem.quantity,
          },
          tx
        );
      }

      // Delete guest cart items using the transaction client
      await this.cartRepository.deleteBySession(sessionId, tx);
    });

    return await this.getCart(userId);
  }

  /**
   * Clear cart either by userId or sessionId. One of them is required.
   * Returns the result of the delete operation (depends on repository implementation).
   */
  async clearCart(userId?: string, sessionId?: string, tx?: any) {
    if (!userId && !sessionId) {
      throw createError("User ID or session ID required", 400);
    }

    if (userId) {
      // Pass transaction client to repository if it exists
      return await this.cartRepository.deleteByUser(userId, tx);
    } else {
      // sessionId is guaranteed to exist here
      return await this.cartRepository.deleteBySession(sessionId!, tx);
    }
  }
}
