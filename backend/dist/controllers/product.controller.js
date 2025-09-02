"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const product_service_1 = require("../services/product.service");
class ProductController {
    constructor() {
        this.getProducts = async (req, res, next) => {
            try {
                const filters = {
                    categoryId: req.query.categoryId,
                    minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
                    maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
                    search: req.query.search,
                    sortBy: req.query.sortBy,
                    page: req.query.page ? Number(req.query.page) : 1,
                    limit: req.query.limit ? Number(req.query.limit) : 12,
                };
                const result = await this.productService.getProducts(filters);
                res.json(result);
            }
            catch (error) {
                next(error);
            }
        };
        this.getProductBySlug = async (req, res, next) => {
            try {
                const { slug } = req.params;
                const product = await this.productService.getProductBySlug(slug);
                res.json(product);
            }
            catch (error) {
                next(error);
            }
        };
        this.createProduct = async (req, res, next) => {
            try {
                const product = await this.productService.createProduct(req.body);
                res.status(201).json({
                    message: "Product created successfully",
                    product,
                });
            }
            catch (error) {
                next(error);
            }
        };
        this.updateProduct = async (req, res, next) => {
            try {
                const { id } = req.params;
                const product = await this.productService.updateProduct(id, req.body);
                res.json({
                    message: "Product updated successfully",
                    product,
                });
            }
            catch (error) {
                next(error);
            }
        };
        this.deleteProduct = async (req, res, next) => {
            try {
                const { id } = req.params;
                await this.productService.deleteProduct(id);
                res.json({
                    message: "Product deleted successfully",
                });
            }
            catch (error) {
                next(error);
            }
        };
        this.productService = new product_service_1.ProductService();
    }
}
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map