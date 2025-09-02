"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const category_repo_1 = require("../repositories/category.repo");
const error_middleware_1 = require("../middlewares/error.middleware");
class CategoryService {
    constructor() {
        this.categoryRepository = new category_repo_1.CategoryRepository();
    }
    async getCategories() {
        return await this.categoryRepository.findAll();
    }
    async createCategory(data) {
        const existingCategory = await this.categoryRepository.findBySlug(data.slug);
        if (existingCategory) {
            throw (0, error_middleware_1.createError)("Category with this slug already exists", 409);
        }
        if (data.parentId) {
            const parentCategory = await this.categoryRepository.findById(data.parentId);
            if (!parentCategory) {
                throw (0, error_middleware_1.createError)("Parent category not found", 404);
            }
        }
        return await this.categoryRepository.create(data);
    }
    async updateCategory(id, data) {
        const existingCategory = await this.categoryRepository.findById(id);
        if (!existingCategory) {
            throw (0, error_middleware_1.createError)("Category not found", 404);
        }
        if (data.slug && data.slug !== existingCategory.slug) {
            const existingBySlug = await this.categoryRepository.findBySlug(data.slug);
            if (existingBySlug) {
                throw (0, error_middleware_1.createError)("Category with this slug already exists", 409);
            }
        }
        if (data.parentId) {
            const parentCategory = await this.categoryRepository.findById(data.parentId);
            if (!parentCategory) {
                throw (0, error_middleware_1.createError)("Parent category not found", 404);
            }
        }
        return await this.categoryRepository.update(id, data);
    }
    async deleteCategory(id) {
        const existingCategory = await this.categoryRepository.findById(id);
        if (!existingCategory) {
            throw (0, error_middleware_1.createError)("Category not found", 404);
        }
        const hasProducts = await this.categoryRepository.hasProducts(id);
        if (hasProducts) {
            throw (0, error_middleware_1.createError)("Cannot delete category with products", 400);
        }
        const hasChildren = await this.categoryRepository.hasChildren(id);
        if (hasChildren) {
            throw (0, error_middleware_1.createError)("Cannot delete category with subcategories", 400);
        }
        return await this.categoryRepository.delete(id);
    }
}
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.service.js.map