import type { Request, Response, NextFunction } from "express"
import { AuthService } from "../services/auth.service"
import { createError } from "../middlewares/error.middleware"
import type { AuthRequest } from "../middlewares/auth.middleware"

export class AuthController {
  private authService: AuthService

  constructor() {
    this.authService = new AuthService()
  }

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password, name } = req.body
      const result = await this.authService.register({ email, password, name })

      res.status(201).json({
        message: "User registered successfully",
        user: result.user,
        tokens: result.tokens,
      })
    } catch (error) {
      next(error)
    }
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body
      const result = await this.authService.login({ email, password })

      // Set refresh token as httpOnly cookie
      res.cookie("refreshToken", result.tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })

      res.json({
        message: "Login successful",
        user: result.user,
        accessToken: result.tokens.accessToken,
      })
    } catch (error) {
      next(error)
    }
  }

  refresh = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refreshToken = req.cookies.refreshToken || req.body.refreshToken

      if (!refreshToken) {
        throw createError("Refresh token required", 401)
      }

      const result = await this.authService.refreshToken(refreshToken)

      // Set new refresh token as httpOnly cookie
      res.cookie("refreshToken", result.tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })

      res.json({
        message: "Token refreshed successfully",
        user: result.user,
        accessToken: result.tokens.accessToken,
      })
    } catch (error) {
      next(error)
    }
  }

  logout = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      // Clear refresh token cookie
      res.clearCookie("refreshToken")

      res.json({
        message: "Logout successful",
      })
    } catch (error) {
      next(error)
    }
  }
}
