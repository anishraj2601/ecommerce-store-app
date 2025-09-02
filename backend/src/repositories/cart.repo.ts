import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export class CartRepository {
  async findByUserOrSession(userId?: string, sessionId?: string) {
    const where: any = {}

    if (userId) {
      where.userId = userId
    } else if (sessionId) {
      where.sessionId = sessionId
    }

    return await prisma.cartItem.findMany({
      where,
      include: {
        product: {
          include: {
            category: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })
  }

  async findById(id: string) {
    return await prisma.cartItem.findUnique({
      where: { id },
      include: {
        product: true,
      },
    })
  }

  async findByProductAndUser(productId: string, userId?: string, sessionId?: string) {
    const where: any = { productId }

    if (userId) {
      where.userId = userId
    } else if (sessionId) {
      where.sessionId = sessionId
    }

    return await prisma.cartItem.findFirst({
      where,
    })
  }

  async create(data: {
    userId?: string
    sessionId?: string
    productId: string
    quantity: number
    priceSnapshot: number
  }) {
    return await prisma.cartItem.create({
      data,
      include: {
        product: {
          include: {
            category: true,
          },
        },
      },
    })
  }

  async updateQuantity(id: string, quantity: number) {
    return await prisma.cartItem.update({
      where: { id },
      data: { quantity },
      include: {
        product: {
          include: {
            category: true,
          },
        },
      },
    })
  }

  async delete(id: string) {
    return await prisma.cartItem.delete({
      where: { id },
    })
  }

  async deleteByUser(userId: string) {
    return await prisma.cartItem.deleteMany({
      where: { userId },
    })
  }

  async deleteBySession(sessionId: string) {
    return await prisma.cartItem.deleteMany({
      where: { sessionId },
    })
  }
}
