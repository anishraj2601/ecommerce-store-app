"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class OrderRepository {
    async findByUserId(userId, page = 1, limit = 10) {
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
    async findById(id) {
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
    async create(data) {
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
    async findAll(page = 1, limit = 20, status) {
        const skip = (page - 1) * limit;
        const where = {};
        if (status) {
            where.status = status;
        }
        const [orders, total] = await Promise.all([
            prisma.order.findMany({
                where: where,
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
            prisma.order.count({ where: where }),
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
    async updateStatus(id, status) {
        const castStatus = status;
        return await prisma.order.update({
            where: { id },
            data: { status: castStatus },
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
    async updateProductInventory(productId, quantity) {
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
exports.OrderRepository = OrderRepository;
//# sourceMappingURL=order.repo.js.map