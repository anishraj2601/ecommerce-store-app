"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class CategoryRepository {
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
        });
    }
    async findById(id) {
        return await prisma.category.findUnique({
            where: { id },
            include: {
                children: true,
                parent: true,
            },
        });
    }
    async findBySlug(slug) {
        return await prisma.category.findUnique({
            where: { slug },
        });
    }
    async create(data) {
        return await prisma.category.create({
            data,
            include: {
                children: true,
                parent: true,
            },
        });
    }
    async update(id, data) {
        return await prisma.category.update({
            where: { id },
            data,
            include: {
                children: true,
                parent: true,
            },
        });
    }
    async delete(id) {
        return await prisma.category.delete({
            where: { id },
        });
    }
    async hasProducts(id) {
        const count = await prisma.product.count({
            where: { categoryId: id },
        });
        return count > 0;
    }
    async hasChildren(id) {
        const count = await prisma.category.count({
            where: { parentId: id },
        });
        return count > 0;
    }
}
exports.CategoryRepository = CategoryRepository;
//# sourceMappingURL=category.repo.js.map