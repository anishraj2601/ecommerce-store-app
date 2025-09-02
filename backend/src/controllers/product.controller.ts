import type { Request, Response, NextFunction } from "express"
import { ProductService } from "../services/product.service"
import type { ProductFilters } from "../types"
import type { AuthRequest } from "../middlewares/auth.middleware"

export class ProductController {
  private productService: ProductService

  constructor() {
    this.productService = new ProductService()
  }

  getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const filters: ProductFilters = {
        categoryId: req.query.categoryId as string,
        minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
        maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
        search: req.query.search as string,
        sortBy: req.query.sortBy as ProductFilters["sortBy"],
        page: req.query.page ? Number(req.query.page) : 1,
        limit: req.query.limit ? Number(req.query.limit) : 12,
      }

      const result = await this.productService.getProducts(filters)
      res.json(result)
    } catch (error) {
      next(error)
    }
  }

  getProductBySlug = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { slug } = req.params
      const product = await this.productService.getProductBySlug(slug)
      res.json(product)
    } catch (error) {
      next(error)
    }
  }

  createProduct = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const product = await this.productService.createProduct(req.body)
      res.status(201).json({
        message: "Product created successfully",
        product,
      })
    } catch (error) {
      next(error)
    }
  }

  updateProduct = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      const product = await this.productService.updateProduct(id, req.body)
      res.json({
        message: "Product updated successfully",
        product,
      })
    } catch (error) {
      next(error)
    }
  }

  deleteProduct = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      await this.productService.deleteProduct(id)
      res.json({
        message: "Product deleted successfully",
      })
    } catch (error) {
      next(error)
    }
  }
}
