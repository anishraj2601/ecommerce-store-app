import jwt from "jsonwebtoken";
export declare function generateAccessToken(payload: object): string;
export declare function generateRefreshToken(payload: object): string;
export declare const signRefreshToken: typeof generateRefreshToken;
export declare function verifyRefreshToken(token: string): string | jwt.JwtPayload;
//# sourceMappingURL=jwt.d.ts.map