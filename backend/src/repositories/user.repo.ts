import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export class UserRepository {
  async create(data: {
    email: string
    passwordHash: string
    name?: string
  }) {
    return await prisma.user.create({
      data,
    })
  }

  async findById(id: string) {
    return await prisma.user.findUnique({
      where: { id },
      include: {
        addresses: {
          orderBy: {
            isDefault: "desc",
          },
        },
      },
    })
  }

  async findByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
    })
  }

  async update(
    id: string,
    data: {
      name?: string
      email?: string
    },
  ) {
    return await prisma.user.update({
      where: { id },
      data,
    })
  }

  async delete(id: string) {
    return await prisma.user.delete({
      where: { id },
    })
  }

  async addAddress(userId: string, addressData: any) {
    return await prisma.address.create({
      data: {
        ...addressData,
        userId,
      },
    })
  }

  async unsetDefaultAddresses(userId: string) {
    return await prisma.address.updateMany({
      where: {
        userId,
        isDefault: true,
      },
      data: {
        isDefault: false,
      },
    })
  }
}
