import { PrismaClient } from "@prisma/client"
import type { CreateProductDTO, UpdateProductDTO, ProductFilters } from "../types"

const prisma = new PrismaClient()

export class ProductRepository {
  async findMany(filters: ProductFilters) {
    const { categoryId, minPrice, maxPrice, search, sortBy = "created_desc", page = 1, limit = 12 } = filters

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {
      isActive: true,
    }

    if (categoryId) {
      where.categoryId = categoryId
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {}
      if (minPrice !== undefined) where.price.gte = minPrice
      if (maxPrice !== undefined) where.price.lte = maxPrice
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ]
    }

    // Build orderBy clause
    let orderBy: any = {}
    switch (sortBy) {
      case "price_asc":
        orderBy = { price: "asc" }
        break
      case "price_desc":
        orderBy = { price: "desc" }
        break
      case "name_asc":
        orderBy = { title: "asc" }
        break
      case "name_desc":
        orderBy = { title: "desc" }
        break
      default:
        orderBy = { createdAt: "desc" }
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: {
          category: true,
        },
      }),
      prisma.product.count({ where }),
    ])

    return {
      products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    }
  }

  async findById(id: string) {
    return await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
      },
    })
  }

  async findBySlug(slug: string) {
    return await prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
      },
    })
  }

  async findBySku(sku: string) {
    return await prisma.product.findUnique({
      where: { sku },
    })
  }

  async create(data: CreateProductDTO) {
    return await prisma.product.create({
      data,
      include: {
        category: true,
      },
    })
  }

  async update(id: string, data: UpdateProductDTO) {
    return await prisma.product.update({
      where: { id },
      data,
      include: {
        category: true,
      },
    })
  }

  async delete(id: string) {
    return await prisma.product.delete({
      where: { id },
    })
  }
}
