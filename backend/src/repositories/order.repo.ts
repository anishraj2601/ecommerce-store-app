// src/repositories/order.repo.ts
import { PrismaClient, OrderStatus } from "@prisma/client";

const prisma = new PrismaClient();

export class OrderRepository {
  async findByUserId(userId: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where: { userId },
        include: {
          orderItems: {
            include: {
              product: {
                select: {
                  title: true,
                  slug: true,
                  defaultImage: true,
                },
              },
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.order.count({ where: { userId } }),
    ]);

    return {
      orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: string) {
    return await prisma.order.findUnique({
      where: { id },
      include: {
        orderItems: {
          include: {
            product: {
              select: {
                title: true,
                slug: true,
                defaultImage: true,
              },
            },
          },
        },
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async create(data: {
    userId: string;
    orderNumber: string;
    subtotal: number;
    tax: number;
    shipping: number;
    total: number;
    shippingAddress: any;
    billingAddress: any;
    items: Array<{
      productId: string;
      quantity: number;
      priceSnapshot: number;
      productTitle: string;
      productImage?: string;
    }>;
  }) {
    const { items, ...orderData } = data;

    return await prisma.order.create({
      data: {
        ...orderData,
        orderItems: {
          create: items,
        },
      },
      include: {
        orderItems: {
          include: {
            product: {
              select: {
                title: true,
                slug: true,
                defaultImage: true,
              },
            },
          },
        },
      },
    });
  }

  async findAll(page = 1, limit = 20, status?: string) {
    const skip = (page - 1) * limit;

    // Build `where` defensively. Prisma expects `status` to be of enum type OrderStatus.
    // We cast to the enum here (using `unknown as OrderStatus`) to satisfy TypeScript.
    // Alternatively, you could validate `status` against allowed enum values before casting.
    const where: any = {};
    if (status) {
      where.status = (status as unknown) as OrderStatus;
    }

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where: where as any,
        include: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
          orderItems: {
            include: {
              product: {
                select: {
                  title: true,
                  slug: true,
                },
              },
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.order.count({ where: where as any }),
    ]);

    return {
      orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async updateStatus(id: string, status: string) {
    // Cast status to OrderStatus to satisfy Prisma/TS types.
    const castStatus = (status as unknown) as OrderStatus;

    return await prisma.order.update({
      where: { id },
      data: { status: castStatus as any },
      include: {
        orderItems: {
          include: {
            product: {
              select: {
                title: true,
                slug: true,
                defaultImage: true,
              },
            },
          },
        },
      },
    });
  }

  async updateProductInventory(productId: string, quantity: number) {
    return await prisma.product.update({
      where: { id: productId },
      data: {
        inventory: {
          decrement: quantity,
        },
      },
    });
  }
}
