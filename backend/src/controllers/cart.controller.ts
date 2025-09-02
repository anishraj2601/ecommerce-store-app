import type { Request, Response, NextFunction } from "express"
import { CartService } from "../services/cart.service"
import type { AuthRequest } from "../middlewares/auth.middleware"

export class CartController {
  private cartService: CartService

  constructor() {
    this.cartService = new CartService()
  }

  getCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as AuthRequest).user?.userId
      const sessionId = req.headers["x-session-id"] as string

      const cart = await this.cartService.getCart(userId, sessionId)
      res.json(cart)
    } catch (error) {
      next(error)
    }
  }

  addToCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as AuthRequest).user?.userId
      const sessionId = req.headers["x-session-id"] as string
      const { productId, quantity } = req.body

      const cartItem = await this.cartService.addToCart({
        userId,
        sessionId,
        productId,
        quantity,
      })

      res.status(201).json({
        message: "Item added to cart",
        cartItem,
      })
    } catch (error) {
      next(error)
    }
  }

  updateCartItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { itemId } = req.params
      const { quantity } = req.body
      const userId = (req as AuthRequest).user?.userId

      const cartItem = await this.cartService.updateCartItem(itemId, quantity, userId)
      res.json({
        message: "Cart item updated",
        cartItem,
      })
    } catch (error) {
      next(error)
    }
  }

  removeFromCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { itemId } = req.params
      const userId = (req as AuthRequest).user?.userId

      await this.cartService.removeFromCart(itemId, userId)
      res.json({
        message: "Item removed from cart",
      })
    } catch (error) {
      next(error)
    }
  }

  mergeCart = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId
      const sessionId = req.headers["x-session-id"] as string

      const cart = await this.cartService.mergeGuestCart(userId, sessionId)
      res.json({
        message: "Cart merged successfully",
        cart,
      })
    } catch (error) {
      next(error)
    }
  }
}
