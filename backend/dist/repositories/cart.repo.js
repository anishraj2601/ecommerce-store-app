"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class CartRepository {
    async findByUserOrSession(userId, sessionId) {
        const where = {};
        if (userId) {
            where.userId = userId;
        }
        else if (sessionId) {
            where.sessionId = sessionId;
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
        });
    }
    async findById(id) {
        return await prisma.cartItem.findUnique({
            where: { id },
            include: {
                product: true,
            },
        });
    }
    async findByProductAndUser(productId, userId, sessionId) {
        const where = { productId };
        if (userId) {
            where.userId = userId;
        }
        else if (sessionId) {
            where.sessionId = sessionId;
        }
        return await prisma.cartItem.findFirst({
            where,
        });
    }
    async create(data) {
        return await prisma.cartItem.create({
            data,
            include: {
                product: {
                    include: {
                        category: true,
                    },
                },
            },
        });
    }
    async updateQuantity(id, quantity) {
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
        });
    }
    async delete(id) {
        return await prisma.cartItem.delete({
            where: { id },
        });
    }
    async deleteByUser(userId) {
        return await prisma.cartItem.deleteMany({
            where: { userId },
        });
    }
    async deleteBySession(sessionId) {
        return await prisma.cartItem.deleteMany({
            where: { sessionId },
        });
    }
}
exports.CartRepository = CartRepository;
//# sourceMappingURL=cart.repo.js.map