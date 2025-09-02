import { CategoryRepository } from "../repositories/category.repo"
import { createError } from "../middlewares/error.middleware"
import type { CreateCategoryDTO } from "../types"

export class CategoryService {
  private categoryRepository: CategoryRepository

  constructor() {
    this.categoryRepository = new CategoryRepository()
  }

  async getCategories() {
    return await this.categoryRepository.findAll()
  }

  async createCategory(data: CreateCategoryDTO) {
    // Check if slug already exists
    const existingCategory = await this.categoryRepository.findBySlug(data.slug)
    if (existingCategory) {
      throw createError("Category with this slug already exists", 409)
    }

    // If parentId is provided, check if parent exists
    if (data.parentId) {
      const parentCategory = await this.categoryRepository.findById(data.parentId)
      if (!parentCategory) {
        throw createError("Parent category not found", 404)
      }
    }

    return await this.categoryRepository.create(data)
  }

  async updateCategory(id: string, data: Partial<CreateCategoryDTO>) {
    const existingCategory = await this.categoryRepository.findById(id)
    if (!existingCategory) {
      throw createError("Category not found", 404)
    }

    // Check if slug is being updated and already exists
    if (data.slug && data.slug !== existingCategory.slug) {
      const existingBySlug = await this.categoryRepository.findBySlug(data.slug)
      if (existingBySlug) {
        throw createError("Category with this slug already exists", 409)
      }
    }

    // If parentId is being updated, check if parent exists
    if (data.parentId) {
      const parentCategory = await this.categoryRepository.findById(data.parentId)
      if (!parentCategory) {
        throw createError("Parent category not found", 404)
      }
    }

    return await this.categoryRepository.update(id, data)
  }

  async deleteCategory(id: string) {
    const existingCategory = await this.categoryRepository.findById(id)
    if (!existingCategory) {
      throw createError("Category not found", 404)
    }

    // Check if category has products
    const hasProducts = await this.categoryRepository.hasProducts(id)
    if (hasProducts) {
      throw createError("Cannot delete category with products", 400)
    }

    // Check if category has children
    const hasChildren = await this.categoryRepository.hasChildren(id)
    if (hasChildren) {
      throw createError("Cannot delete category with subcategories", 400)
    }

    return await this.categoryRepository.delete(id)
  }
}
