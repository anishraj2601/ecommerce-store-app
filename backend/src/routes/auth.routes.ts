import { Router } from "express"
import { AuthController } from "../controllers/auth.controller"
import { authLimiter } from "../middlewares/rateLimiter"
import { authenticate } from "../middlewares/auth.middleware"
import { validateRequest } from "../middlewares/validateRequest"
import { registerSchema, loginSchema } from "../utils/validation"

const router = Router()
const authController = new AuthController()

// Apply rate limiting to auth routes
router.use(authLimiter)

// POST /api/auth/register
router.post("/register", validateRequest(registerSchema), authController.register)

// POST /api/auth/login
router.post("/login", validateRequest(loginSchema), authController.login)

// POST /api/auth/refresh
router.post("/refresh", authController.refresh)

// POST /api/auth/logout
router.post("/logout", authenticate, authController.logout)

export default router
