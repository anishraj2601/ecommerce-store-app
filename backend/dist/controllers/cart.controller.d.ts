import type { Request, Response, NextFunction } from "express";
import type { AuthRequest } from "../middlewares/auth.middleware";
export declare class CartController {
    private cartService;
    constructor();
    getCart: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    addToCart: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateCartItem: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    removeFromCart: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    mergeCart: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
}
//# sourceMappingURL=cart.controller.d.ts.map