"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const logger_1 = require("./utils/logger");
const error_middleware_1 = require("./middlewares/error.middleware");
const rateLimiter_1 = require("./middlewares/rateLimiter");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const users_routes_1 = __importDefault(require("./routes/users.routes"));
const products_routes_1 = __importDefault(require("./routes/products.routes"));
const categories_routes_1 = __importDefault(require("./routes/categories.routes"));
const cart_routes_1 = __importDefault(require("./routes/cart.routes"));
const orders_routes_1 = __importDefault(require("./routes/orders.routes"));
const webhook_routes_1 = __importDefault(require("./routes/webhook.routes"));
const payment_routes_1 = __importDefault(require("./routes/payment.routes"));
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
}));
app.use(rateLimiter_1.rateLimiter);
app.use(express_1.default.json({ limit: "10mb" }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, compression_1.default)());
app.use((req, res, next) => {
    logger_1.logger.info(`${req.method} ${req.path}`);
    next();
});
app.get("/health", (req, res) => {
    res.json({ status: "OK", timestamp: new Date().toISOString() });
});
app.use("/api/auth", auth_routes_1.default);
app.use("/api/users", users_routes_1.default);
app.use("/api/products", products_routes_1.default);
app.use("/api/categories", categories_routes_1.default);
app.use("/api/cart", cart_routes_1.default);
app.use("/api/orders", orders_routes_1.default);
app.use("/api/payments", payment_routes_1.default);
app.use("/api/webhooks", webhook_routes_1.default);
app.use(error_middleware_1.errorHandler);
app.use("*", (req, res) => {
    res.status(404).json({ error: "Route not found" });
});
exports.default = app;
//# sourceMappingURL=app.js.map