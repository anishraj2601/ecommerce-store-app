import { UserRepository } from "../repositories/user.repo"
import { createError } from "../middlewares/error.middleware"

export class UserService {
  private userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  async getUserProfile(userId: string) {
    const user = await this.userRepository.findById(userId)
    if (!user) {
      throw createError("User not found", 404)
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt,
    }
  }

  async updateUserProfile(userId: string, data: { name?: string; email?: string }) {
    const user = await this.userRepository.findById(userId)
    if (!user) {
      throw createError("User not found", 404)
    }

    // Check if email is being updated and already exists
    if (data.email && data.email !== user.email) {
      const existingUser = await this.userRepository.findByEmail(data.email)
      if (existingUser) {
        throw createError("Email already in use", 409)
      }
    }

    const updatedUser = await this.userRepository.update(userId, data)

    return {
      id: updatedUser.id,
      email: updatedUser.email,
      name: updatedUser.name,
      role: updatedUser.role,
    }
  }

  async getUserAddresses(userId: string) {
    const user = await this.userRepository.findById(userId)
    if (!user) {
      throw createError("User not found", 404)
    }

    return user.addresses
  }

  async addUserAddress(userId: string, addressData: any) {
    const user = await this.userRepository.findById(userId)
    if (!user) {
      throw createError("User not found", 404)
    }

    // If this is the first address or marked as default, make it default
    const isFirstAddress = user.addresses.length === 0
    const isDefault = addressData.isDefault || isFirstAddress

    // If setting as default, unset other default addresses
    if (isDefault) {
      await this.userRepository.unsetDefaultAddresses(userId)
    }

    return await this.userRepository.addAddress(userId, {
      ...addressData,
      isDefault,
    })
  }
}
