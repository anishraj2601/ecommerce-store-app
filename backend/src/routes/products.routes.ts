import { Router } from "express"
import { ProductController } from "../controllers/product.controller"
import { authenticate, requireAdmin } from "../middlewares/auth.middleware"
import { validateRequest } from "../middlewares/validateRequest"
import { createProductSchema } from "../utils/validation"

const router = Router()
const productController = new ProductController()

// GET /api/products - Public route
router.get("/", productController.getProducts)

// GET /api/products/:slug - Public route
router.get("/:slug", productController.getProductBySlug)

// Admin routes
router.use(authenticate, requireAdmin)

// POST /api/products - Admin only
router.post("/", validateRequest(createProductSchema), productController.createProduct)

// PUT /api/products/:id - Admin only
router.put("/:id", productController.updateProduct)

// DELETE /api/products/:id - Admin only
router.delete("/:id", productController.deleteProduct)

export default router
