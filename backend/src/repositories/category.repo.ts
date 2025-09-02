import { PrismaClient } from "@prisma/client"
import type { CreateCategoryDTO } from "../types"

const prisma = new PrismaClient()

export class CategoryRepository {
  async findAll() {
    return await prisma.category.findMany({
      include: {
        children: true,
        parent: true,
        _count: {
          select: {
            products: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    })
  }

  async findById(id: string) {
    return await prisma.category.findUnique({
      where: { id },
      include: {
        children: true,
        parent: true,
      },
    })
  }

  async findBySlug(slug: string) {
    return await prisma.category.findUnique({
      where: { slug },
    })
  }

  async create(data: CreateCategoryDTO) {
    return await prisma.category.create({
      data,
      include: {
        children: true,
        parent: true,
      },
    })
  }

  async update(id: string, data: Partial<CreateCategoryDTO>) {
    return await prisma.category.update({
      where: { id },
      data,
      include: {
        children: true,
        parent: true,
      },
    })
  }

  async delete(id: string) {
    return await prisma.category.delete({
      where: { id },
    })
  }

  async hasProducts(id: string) {
    const count = await prisma.product.count({
      where: { categoryId: id },
    })
    return count > 0
  }

  async hasChildren(id: string) {
    const count = await prisma.category.count({
      where: { parentId: id },
    })
    return count > 0
  }
}
