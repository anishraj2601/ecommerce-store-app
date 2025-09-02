import { Router } from "express"
import { CategoryController } from "../controllers/category.controller"
import { authenticate, requireAdmin } from "../middlewares/auth.middleware"

const router = Router()
const categoryController = new CategoryController()

// GET /api/categories - Public route
router.get("/", categoryController.getCategories)

// Admin routes
router.use(authenticate, requireAdmin)

// POST /api/categories - Admin only
router.post("/", categoryController.createCategory)

// PUT /api/categories/:id - Admin only
router.put("/:id", categoryController.updateCategory)

// DELETE /api/categories/:id - Admin only
router.delete("/:id", categoryController.deleteCategory)

export default router
