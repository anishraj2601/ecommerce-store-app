import { Request, Response, NextFunction } from "express";
export interface AuthRequest extends Request {
    user?: {
        userId: string;
        role?: string;
    };
}
export declare const authenticate: (req: AuthRequest, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
export declare const requireAdmin: (req: AuthRequest, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
//# sourceMappingURL=auth.middleware.d.ts.map