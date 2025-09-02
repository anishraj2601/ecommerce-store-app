"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class UserRepository {
    async create(data) {
        return await prisma.user.create({
            data,
        });
    }
    async findById(id) {
        return await prisma.user.findUnique({
            where: { id },
            include: {
                addresses: {
                    orderBy: {
                        isDefault: "desc",
                    },
                },
            },
        });
    }
    async findByEmail(email) {
        return await prisma.user.findUnique({
            where: { email },
        });
    }
    async update(id, data) {
        return await prisma.user.update({
            where: { id },
            data,
        });
    }
    async delete(id) {
        return await prisma.user.delete({
            where: { id },
        });
    }
    async addAddress(userId, addressData) {
        return await prisma.address.create({
            data: {
                ...addressData,
                userId,
            },
        });
    }
    async unsetDefaultAddresses(userId) {
        return await prisma.address.updateMany({
            where: {
                userId,
                isDefault: true,
            },
            data: {
                isDefault: false,
            },
        });
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repo.js.map