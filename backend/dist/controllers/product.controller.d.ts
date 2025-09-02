import type { Request, Response, NextFunction } from "express";
import type { AuthRequest } from "../middlewares/auth.middleware";
export declare class ProductController {
    private productService;
    constructor();
    getProducts: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getProductBySlug: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    createProduct: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
    updateProduct: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
    deleteProduct: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
}
//# sourceMappingURL=product.controller.d.ts.map