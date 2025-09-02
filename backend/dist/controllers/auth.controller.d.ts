import type { Request, Response, NextFunction } from "express";
import type { AuthRequest } from "../middlewares/auth.middleware";
export declare class AuthController {
    private authService;
    constructor();
    register: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    login: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    refresh: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    logout: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
}
//# sourceMappingURL=auth.controller.d.ts.map