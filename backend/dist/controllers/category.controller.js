"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const category_service_1 = require("../services/category.service");
class CategoryController {
    constructor() {
        this.getCategories = async (req, res, next) => {
            try {
                const categories = await this.categoryService.getCategories();
                res.json(categories);
            }
            catch (error) {
                next(error);
            }
        };
        this.createCategory = async (req, res, next) => {
            try {
                const category = await this.categoryService.createCategory(req.body);
                res.status(201).json({
                    message: "Category created successfully",
                    category,
                });
            }
            catch (error) {
                next(error);
            }
        };
        this.updateCategory = async (req, res, next) => {
            try {
                const { id } = req.params;
                const category = await this.categoryService.updateCategory(id, req.body);
                res.json({
                    message: "Category updated successfully",
                    category,
                });
            }
            catch (error) {
                next(error);
            }
        };
        this.deleteCategory = async (req, res, next) => {
            try {
                const { id } = req.params;
                await this.categoryService.deleteCategory(id);
                res.json({
                    message: "Category deleted successfully",
                });
            }
            catch (error) {
                next(error);
            }
        };
        this.categoryService = new category_service_1.CategoryService();
    }
}
exports.CategoryController = CategoryController;
//# sourceMappingURL=category.controller.js.map