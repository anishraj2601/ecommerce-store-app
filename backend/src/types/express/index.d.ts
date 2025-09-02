import "express";

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      userId: string; // match the actual property your middleware sets
      role?: string;
    };
  }
}
