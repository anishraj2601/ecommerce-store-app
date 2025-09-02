// src/utils/jwt.ts
import jwt from "jsonwebtoken";
import { config } from "../config";

export function generateAccessToken(payload: object) {
  return jwt.sign(payload, config.JWT_SECRET, { expiresIn: "15m" });
}

export function generateRefreshToken(payload: object) {
  return jwt.sign(payload, config.JWT_REFRESH_SECRET, { expiresIn: "7d" });
}

// If your existing code calls this:
export const signRefreshToken = generateRefreshToken;

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, config.JWT_REFRESH_SECRET);
}
