"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const product_repo_1 = require("../repositories/product.repo");
const error_middleware_1 = require("../middlewares/error.middleware");
class ProductService {
    constructor() {
        this.productRepository = new product_repo_1.ProductRepository();
    }
    async getProducts(filters) {
        return await this.productRepository.findMany(filters);
    }
    async getProductBySlug(slug) {
        const product = await this.productRepository.findBySlug(slug);
        if (!product) {
            throw (0, error_middleware_1.createError)("Product not found", 404);
        }
        return product;
    }
    async getProductById(id) {
        const product = await this.productRepository.findById(id);
        if (!product) {
            throw (0, error_middleware_1.createError)("Product not found", 404);
        }
        return product;
    }
    async createProduct(data) {
        const existingProduct = await this.productRepository.findBySlug(data.slug);
        if (existingProduct) {
            throw (0, error_middleware_1.createError)("Product with this slug already exists", 409);
        }
        const existingBySku = await this.productRepository.findBySku(data.sku);
        if (existingBySku) {
            throw (0, error_middleware_1.createError)("Product with this SKU already exists", 409);
        }
        return await this.productRepository.create(data);
    }
    async updateProduct(id, data) {
        const existingProduct = await this.productRepository.findById(id);
        if (!existingProduct) {
            throw (0, error_middleware_1.createError)("Product not found", 404);
        }
        if (data.slug && data.slug !== existingProduct.slug) {
            const existingBySlug = await this.productRepository.findBySlug(data.slug);
            if (existingBySlug) {
                throw (0, error_middleware_1.createError)("Product with this slug already exists", 409);
            }
        }
        if (data.sku && data.sku !== existingProduct.sku) {
            const existingBySku = await this.productRepository.findBySku(data.sku);
            if (existingBySku) {
                throw (0, error_middleware_1.createError)("Product with this SKU already exists", 409);
            }
        }
        return await this.productRepository.update(id, data);
    }
    async deleteProduct(id) {
        const existingProduct = await this.productRepository.findById(id);
        if (!existingProduct) {
            throw (0, error_middleware_1.createError)("Product not found", 404);
        }
        return await this.productRepository.delete(id);
    }
}
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map