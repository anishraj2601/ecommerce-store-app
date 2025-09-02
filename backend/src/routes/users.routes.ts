import { Router } from "express"
import { UserController } from "../controllers/user.controller"
import { authenticate } from "../middlewares/auth.middleware"
import { validateRequest } from "../middlewares/validateRequest"
import { addressSchema } from "../utils/validation"

const router = Router()
const userController = new UserController()

// All user routes require authentication
router.use(authenticate)

// GET /api/users/profile
router.get("/profile", userController.getProfile)

// PUT /api/users/profile
router.put("/profile", userController.updateProfile)

// GET /api/users/addresses
router.get("/addresses", userController.getAddresses)

// POST /api/users/addresses
router.post("/addresses", validateRequest(addressSchema), userController.addAddress)

export default router
