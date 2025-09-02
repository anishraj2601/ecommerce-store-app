// src/services/order.service.ts
import { OrderRepository } from "../repositories/order.repo";
import { ProductService } from "./product.service";
import { CartService } from "./cart.service";
import { createError } from "../middlewares/error.middleware";
import type { CreateOrderDTO } from "../types";
import { prisma } from "../../../prisma";

export class OrderService {
  private orderRepository: OrderRepository;
  private productService: ProductService;
  private cartService: CartService;

  constructor() {
    this.orderRepository = new OrderRepository();
    this.productService = new ProductService();
    this.cartService = new CartService();
  }

  async getUserOrders(userId: string, page = 1, limit = 10) {
    return await this.orderRepository.findByUserId(userId, page, limit);
  }

  async getOrderById(orderId: string, userId: string, userRole: string) {
    const order = await this.orderRepository.findById(orderId);
    if (!order) {
      throw createError("Order not found", 404);
    }

    // Check if user owns the order or is admin
    if (order.userId !== userId && userRole !== "ADMIN") {
      throw createError("Unauthorized", 403);
    }

    return order;
  }

  async createOrder(userId: string, orderData: CreateOrderDTO) {
    const { items, shippingAddress, billingAddress } = orderData;

    // Validate items and calculate totals
    let subtotal = 0;
    const orderItems: Array<{
      productId: string;
      quantity: number;
      priceSnapshot: number;
      productTitle: string;
      productImage?: string;
    }> = [];

    for (const item of items) {
      const product = await this.productService.getProductById(item.productId);

      if (!product) {
        throw createError(`Product not found: ${item.productId}`, 404);
      }

      if (product.inventory < item.quantity) {
        throw createError(`Insufficient inventory for ${product.title}`, 400);
      }

      const price = Number(product.salePrice ?? product.price ?? 0);
      subtotal += price * item.quantity;

      orderItems.push({
        productId: item.productId,
        quantity: item.quantity,
        priceSnapshot: price,
        productTitle: product.title,
        // convert null to undefined to satisfy Prisma typing (string | undefined)
        productImage: product.defaultImage ?? undefined,
      });
    }

    // Calculate totals
    const shipping = subtotal > 100 ? 0 : 10;
    const tax = Number((subtotal * 0.08).toFixed(2));
    const total = Number((subtotal + shipping + tax).toFixed(2));

    // Use a transaction to ensure atomicity
    const order = await prisma.$transaction(async (tx) => {
      // Generate order number (simple)
      const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).slice(2, 11).toUpperCase()}`;

      // 1. Create order
      const createdOrder = await this.orderRepository.create({
        userId,
        orderNumber,
        subtotal,
        tax,
        shipping,
        total,
        shippingAddress,
        billingAddress: billingAddress || shippingAddress,
        items: orderItems,
      }, tx); // Pass transaction client to repository method

      // 2. Update product inventory
      for (const item of items) {
        await this.orderRepository.updateProductInventory(item.productId, item.quantity, tx);
      }

      // 3. Clear user's cart
      await this.cartService.clearCart(userId, undefined, tx);

      return createdOrder;
    });

    return order;
  }

  async getAllOrders(page = 1, limit = 20, status?: string) {
    return await this.orderRepository.findAll(page, limit, status);
  }

  async updateOrderStatus(orderId: string, status: string) {
    const order = await this.orderRepository.findById(orderId);
    if (!order) {
      throw createError("Order not found", 404);
    }

    return await this.orderRepository.updateStatus(orderId, status);
  }

  /**
   * Generic update helper used by payment flows (e.g. to update status).
   * At the moment we only support updating `status` via this helper.
   * Extend this if you add more fields to be updatable.
   */
  async updateOrder(orderId: string, payload: Partial<{ status: string }>) {
    const order = await this.orderRepository.findById(orderId);
    if (!order) {
      throw createError("Order not found", 404);
    }

    if (payload.status) {
      return await this.orderRepository.updateStatus(orderId, payload.status);
    }

    // If other fields must be updated in future, add logic here.
    throw createError("No updatable fields provided", 400);
  }
}
