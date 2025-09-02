import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../middlewares/auth.middleware";
export declare class UserController {
    private userService;
    constructor();
    getProfile: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
    updateProfile: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
    getAddresses: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
    addAddress: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
}
//# sourceMappingURL=user.controller.d.ts.map