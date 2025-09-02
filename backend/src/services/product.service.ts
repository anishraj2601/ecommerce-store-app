import { ProductRepository } from "../repositories/product.repo"
import { createError } from "../middlewares/error.middleware"
import type { CreateProductDTO, UpdateProductDTO, ProductFilters } from "../types"

export class ProductService {
  private productRepository: ProductRepository

  constructor() {
    this.productRepository = new ProductRepository()
  }

  async getProducts(filters: ProductFilters) {
    return await this.productRepository.findMany(filters)
  }

  async getProductBySlug(slug: string) {
    const product = await this.productRepository.findBySlug(slug)
    if (!product) {
      throw createError("Product not found", 404)
    }
    return product
  }

  async getProductById(id: string) {
    const product = await this.productRepository.findById(id)
    if (!product) {
      throw createError("Product not found", 404)
    }
    return product
  }

  async createProduct(data: CreateProductDTO) {
    // Check if slug already exists
    const existingProduct = await this.productRepository.findBySlug(data.slug)
    if (existingProduct) {
      throw createError("Product with this slug already exists", 409)
    }

    // Check if SKU already exists
    const existingBySku = await this.productRepository.findBySku(data.sku)
    if (existingBySku) {
      throw createError("Product with this SKU already exists", 409)
    }

    return await this.productRepository.create(data)
  }

  async updateProduct(id: string, data: UpdateProductDTO) {
    const existingProduct = await this.productRepository.findById(id)
    if (!existingProduct) {
      throw createError("Product not found", 404)
    }

    // Check if slug is being updated and already exists
    if (data.slug && data.slug !== existingProduct.slug) {
      const existingBySlug = await this.productRepository.findBySlug(data.slug)
      if (existingBySlug) {
        throw createError("Product with this slug already exists", 409)
      }
    }

    // Check if SKU is being updated and already exists
    if (data.sku && data.sku !== existingProduct.sku) {
      const existingBySku = await this.productRepository.findBySku(data.sku)
      if (existingBySku) {
        throw createError("Product with this SKU already exists", 409)
      }
    }

    return await this.productRepository.update(id, data)
  }

  async deleteProduct(id: string) {
    const existingProduct = await this.productRepository.findById(id)
    if (!existingProduct) {
      throw createError("Product not found", 404)
    }

    return await this.productRepository.delete(id)
  }
}
