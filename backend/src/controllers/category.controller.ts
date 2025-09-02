import type { Request, Response, NextFunction } from "express"
import { CategoryService } from "../services/category.service"
import type { AuthRequest } from "../middlewares/auth.middleware"

export class CategoryController {
  private categoryService: CategoryService

  constructor() {
    this.categoryService = new CategoryService()
  }

  getCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categories = await this.categoryService.getCategories()
      res.json(categories)
    } catch (error) {
      next(error)
    }
  }

  createCategory = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const category = await this.categoryService.createCategory(req.body)
      res.status(201).json({
        message: "Category created successfully",
        category,
      })
    } catch (error) {
      next(error)
    }
  }

  updateCategory = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      const category = await this.categoryService.updateCategory(id, req.body)
      res.json({
        message: "Category updated successfully",
        category,
      })
    } catch (error) {
      next(error)
    }
  }

  deleteCategory = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      await this.categoryService.deleteCategory(id)
      res.json({
        message: "Category deleted successfully",
      })
    } catch (error) {
      next(error)
    }
  }
}
