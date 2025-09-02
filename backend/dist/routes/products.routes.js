"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("../controllers/product.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const validateRequest_1 = require("../middlewares/validateRequest");
const validation_1 = require("../utils/validation");
const router = (0, express_1.Router)();
const productController = new product_controller_1.ProductController();
router.get("/", productController.getProducts);
router.get("/:slug", productController.getProductBySlug);
router.use(auth_middleware_1.authenticate, auth_middleware_1.requireAdmin);
router.post("/", (0, validateRequest_1.validateRequest)(validation_1.createProductSchema), productController.createProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);
exports.default = router;
//# sourceMappingURL=products.routes.js.map