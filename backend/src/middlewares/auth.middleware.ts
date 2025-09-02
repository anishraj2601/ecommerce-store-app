// src/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";

// Custom Request type with user info
export interface AuthRequest extends Request {
  user?: {
    userId: string;
    role?: string;
  };
}

// Authenticate user middleware
export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    console.log("Token:", token);
    const decoded = jwt.verify(token, config.JWT_SECRET) as {
      userId: string;
      role?: string;
    };
    console.log("Decoded:", decoded);
    req.user = {
      userId: decoded.userId,
      role: decoded.role,
    };

    return next();
  } catch (err) {
    console.error("JWT verification error:", err);
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Require admin middleware
export const requireAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }
  return next();
};
