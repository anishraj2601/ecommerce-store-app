"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrderSchema = exports.addressSchema = exports.addToCartSchema = exports.createProductSchema = exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email format"),
    password: zod_1.z.string().min(8, "Password must be at least 8 characters"),
    name: zod_1.z.string().min(2, "Name must be at least 2 characters").optional(),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email format"),
    password: zod_1.z.string().min(1, "Password is required"),
});
exports.createProductSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required"),
    slug: zod_1.z.string().min(1, "Slug is required"),
    description: zod_1.z.string().optional(),
    price: zod_1.z.number().positive("Price must be positive"),
    salePrice: zod_1.z.number().positive().optional(),
    sku: zod_1.z.string().min(1, "SKU is required"),
    inventory: zod_1.z.number().int().min(0, "Inventory cannot be negative"),
    categoryId: zod_1.z.string().min(1, "Category ID is required"),
    images: zod_1.z.array(zod_1.z.string()).default([]),
    defaultImage: zod_1.z.string().optional(),
    attributes: zod_1.z.record(zod_1.z.any()).default({}),
});
exports.addToCartSchema = zod_1.z.object({
    productId: zod_1.z.string().min(1, "Product ID is required"),
    quantity: zod_1.z.number().int().positive("Quantity must be positive"),
});
exports.addressSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1, "First name is required"),
    lastName: zod_1.z.string().min(1, "Last name is required"),
    company: zod_1.z.string().optional(),
    addressLine1: zod_1.z.string().min(1, "Address line 1 is required"),
    addressLine2: zod_1.z.string().optional(),
    city: zod_1.z.string().min(1, "City is required"),
    state: zod_1.z.string().min(1, "State is required"),
    postalCode: zod_1.z.string().min(1, "Postal code is required"),
    country: zod_1.z.string().min(1, "Country is required"),
    phone: zod_1.z.string().optional(),
});
exports.createOrderSchema = zod_1.z.object({
    items: zod_1.z.array(zod_1.z.object({
        productId: zod_1.z.string().min(1, "Product ID is required"),
        quantity: zod_1.z.number().int().positive("Quantity must be positive"),
    })),
    shippingAddress: exports.addressSchema,
    billingAddress: exports.addressSchema.optional(),
});
//# sourceMappingURL=validation.js.map