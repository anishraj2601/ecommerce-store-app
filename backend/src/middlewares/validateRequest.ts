import type { Request, Response, NextFunction } from "express"
import type { ZodSchema } from "zod"
import { createError } from "./error.middleware"

export const validateRequest = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.parse(req.body)
      req.body = result
      next()
    } catch (error: any) {
      const errorMessage = error.errors?.map((err: any) => err.message).join(", ") || "Validation failed"
      next(createError(errorMessage, 400))
    }
  }
}
