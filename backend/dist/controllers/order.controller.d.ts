import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../middlewares/auth.middleware";
export declare class OrderController {
    private orderService;
    constructor();
    getUserOrders: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
    getOrderById: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
    createOrder: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
    getAllOrders: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
    updateOrderStatus: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
}
//# sourceMappingURL=order.controller.d.ts.map