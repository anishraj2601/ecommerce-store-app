import type { Request, Response, NextFunction } from "express";
import type { AuthRequest } from "../middlewares/auth.middleware";
export declare class CategoryController {
    private categoryService;
    constructor();
    getCategories: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    createCategory: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
    updateCategory: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
    deleteCategory: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
}
//# sourceMappingURL=category.controller.d.ts.map