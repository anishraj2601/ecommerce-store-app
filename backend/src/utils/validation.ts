import { z } from "zod"

// Auth validation schemas
export const registerSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
})

export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
})

// Product validation schemas
export const createProductSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().optional(),
  price: z.number().positive("Price must be positive"),
  salePrice: z.number().positive().optional(),
  sku: z.string().min(1, "SKU is required"),
  inventory: z.number().int().min(0, "Inventory cannot be negative"),
  categoryId: z.string().min(1, "Category ID is required"),
  images: z.array(z.string()).default([]),
  defaultImage: z.string().optional(),
  attributes: z.record(z.any()).default({}),
})

// Cart validation schemas
export const addToCartSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  quantity: z.number().int().positive("Quantity must be positive"),
})

// Address validation schema
export const addressSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  company: z.string().optional(),
  addressLine1: z.string().min(1, "Address line 1 is required"),
  addressLine2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  country: z.string().min(1, "Country is required"),
  phone: z.string().optional(),
})

// Order validation schema
export const createOrderSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string().min(1, "Product ID is required"),
      quantity: z.number().int().positive("Quantity must be positive"),
    }),
  ),
  shippingAddress: addressSchema,
  billingAddress: addressSchema.optional(),
})
