import { Router } from "express"
import { CartController } from "../controllers/cart.controller"
import { authenticate } from "../middlewares/auth.middleware"
import { validateRequest } from "../middlewares/validateRequest"
import { addToCartSchema } from "../utils/validation"

const router = Router()
const cartController = new CartController()

// GET /api/cart - Get cart (guest or authenticated)
router.get("/", cartController.getCart)

// POST /api/cart - Add to cart
router.post("/", validateRequest(addToCartSchema), cartController.addToCart)

// PUT /api/cart/:itemId - Update cart item
router.put("/:itemId", cartController.updateCartItem)

// DELETE /api/cart/:itemId - Remove from cart
router.delete("/:itemId", cartController.removeFromCart)

// POST /api/cart/merge - Merge guest cart with user cart (authenticated)
router.post("/merge", authenticate, cartController.mergeCart)

export default router
