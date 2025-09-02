import express from "express"
import cors from "cors"
import helmet from "helmet"
import compression from "compression"
import { logger } from "./utils/logger"
import { errorHandler } from "./middlewares/error.middleware"
import { rateLimiter } from "./middlewares/rateLimiter"

// Route imports
import authRoutes from "./routes/auth.routes"
import userRoutes from "./routes/users.routes"
import productRoutes from "./routes/products.routes"
import categoryRoutes from "./routes/categories.routes"
import cartRoutes from "./routes/cart.routes"
import orderRoutes from "./routes/orders.routes"
import webhookRoutes from "./routes/webhook.routes"
import paymentRoutes from "./routes/payment.routes"

const app = express()

// Security middleware
app.use(helmet())
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  }),
)

// Rate limiting
app.use(rateLimiter)

// Body parsing
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true }))

// Compression
app.use(compression())

// Request logging
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`)
  next()
})

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() })
})

// API routes
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/products", productRoutes)
app.use("/api/categories", categoryRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/payments", paymentRoutes)
app.use("/api/webhooks", webhookRoutes)

// Error handling
app.use(errorHandler)

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" })
})

export default app
