import { Router } from "express"
import { OrderController } from "../controllers/order.controller"
import { authenticate, requireAdmin } from "../middlewares/auth.middleware"
import { validateRequest } from "../middlewares/validateRequest"
import { createOrderSchema } from "../utils/validation"

const router = Router()
const orderController = new OrderController()

// All order routes require authentication
router.use(authenticate)

// GET /api/orders - Get user orders
router.get("/", orderController.getUserOrders)

// GET /api/orders/:id - Get single order
router.get("/:id", orderController.getOrderById)

// POST /api/orders - Create order
router.post("/", validateRequest(createOrderSchema), orderController.createOrder)

// Admin routes
router.use(requireAdmin)

// GET /api/orders/admin/all - Get all orders (admin)
router.get("/admin/all", orderController.getAllOrders)

// PUT /api/orders/:id/status - Update order status (admin)
router.put("/:id/status", orderController.updateOrderStatus)

export default router
