import type { Response, NextFunction } from "express"
import { UserService } from "../services/user.service"
import type { AuthRequest } from "../middlewares/auth.middleware"

export class UserController {
  private userService: UserService

  constructor() {
    this.userService = new UserService()
  }

  getProfile = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId
      const user = await this.userService.getUserProfile(userId)
      res.json(user)
    } catch (error) {
      next(error)
    }
  }

  updateProfile = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId
      const user = await this.userService.updateUserProfile(userId, req.body)
      res.json({
        message: "Profile updated successfully",
        user,
      })
    } catch (error) {
      next(error)
    }
  }

  getAddresses = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId
      const addresses = await this.userService.getUserAddresses(userId)
      res.json(addresses)
    } catch (error) {
      next(error)
    }
  }

  addAddress = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId
      const address = await this.userService.addUserAddress(userId, req.body)
      res.status(201).json({
        message: "Address added successfully",
        address,
      })
    } catch (error) {
      next(error)
    }
  }
}
