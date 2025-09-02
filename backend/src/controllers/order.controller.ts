import type { Response, NextFunction } from "express";
import { OrderService } from "../services/order.service";
import type { AuthRequest } from "../middlewares/auth.middleware";

export class OrderController {
  private orderService: OrderService;

  constructor() {
    this.orderService = new OrderService();
  }

  getUserOrders = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user!.userId;
      const page = req.query.page ? Number(req.query.page) : 1;
      const limit = req.query.limit ? Number(req.query.limit) : 10;

      const orders = await this.orderService.getUserOrders(userId, page, limit);
      res.json(orders);
    } catch (error) {
      next(error);
    }
  };

  getOrderById = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const userId = req.user!.userId;
      const userRole = req.user!.role;

      const order = await this.orderService.getOrderById(
        id,
        userId ?? "", // fallback to empty string or handle error
        userRole ?? "" // fallback to empty string or handle error
      );
      res.json(order);
    } catch (error) {
      next(error);
    }
  };

  createOrder = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId;
      const orderData = req.body;

      const order = await this.orderService.createOrder(userId, orderData);
      res.status(201).json({
        message: "Order created successfully",
        order,
      });
    } catch (error) {
      next(error);
    }
  };

  getAllOrders = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const page = req.query.page ? Number(req.query.page) : 1;
      const limit = req.query.limit ? Number(req.query.limit) : 20;
      const status = req.query.status as string;

      const orders = await this.orderService.getAllOrders(page, limit, status);
      res.json(orders);
    } catch (error) {
      next(error);
    }
  };

  updateOrderStatus = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const order = await this.orderService.updateOrderStatus(id, status);
      res.json({
        message: "Order status updated successfully",
        order,
      });
    } catch (error) {
      next(error);
    }
  };
}
