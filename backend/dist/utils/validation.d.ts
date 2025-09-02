import { z } from "zod";
export declare const registerSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    name?: string | undefined;
}, {
    email: string;
    password: string;
    name?: string | undefined;
}>;
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const createProductSchema: z.ZodObject<{
    title: z.ZodString;
    slug: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    price: z.ZodNumber;
    salePrice: z.ZodOptional<z.ZodNumber>;
    sku: z.ZodString;
    inventory: z.ZodNumber;
    categoryId: z.ZodString;
    images: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    defaultImage: z.ZodOptional<z.ZodString>;
    attributes: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, "strip", z.ZodTypeAny, {
    title: string;
    slug: string;
    price: number;
    sku: string;
    inventory: number;
    categoryId: string;
    images: string[];
    attributes: Record<string, any>;
    description?: string | undefined;
    salePrice?: number | undefined;
    defaultImage?: string | undefined;
}, {
    title: string;
    slug: string;
    price: number;
    sku: string;
    inventory: number;
    categoryId: string;
    description?: string | undefined;
    salePrice?: number | undefined;
    images?: string[] | undefined;
    defaultImage?: string | undefined;
    attributes?: Record<string, any> | undefined;
}>;
export declare const addToCartSchema: z.ZodObject<{
    productId: z.ZodString;
    quantity: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    productId: string;
    quantity: number;
}, {
    productId: string;
    quantity: number;
}>;
export declare const addressSchema: z.ZodObject<{
    firstName: z.ZodString;
    lastName: z.ZodString;
    company: z.ZodOptional<z.ZodString>;
    addressLine1: z.ZodString;
    addressLine2: z.ZodOptional<z.ZodString>;
    city: z.ZodString;
    state: z.ZodString;
    postalCode: z.ZodString;
    country: z.ZodString;
    phone: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    firstName: string;
    lastName: string;
    addressLine1: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    company?: string | undefined;
    addressLine2?: string | undefined;
    phone?: string | undefined;
}, {
    firstName: string;
    lastName: string;
    addressLine1: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    company?: string | undefined;
    addressLine2?: string | undefined;
    phone?: string | undefined;
}>;
export declare const createOrderSchema: z.ZodObject<{
    items: z.ZodArray<z.ZodObject<{
        productId: z.ZodString;
        quantity: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        productId: string;
        quantity: number;
    }, {
        productId: string;
        quantity: number;
    }>, "many">;
    shippingAddress: z.ZodObject<{
        firstName: z.ZodString;
        lastName: z.ZodString;
        company: z.ZodOptional<z.ZodString>;
        addressLine1: z.ZodString;
        addressLine2: z.ZodOptional<z.ZodString>;
        city: z.ZodString;
        state: z.ZodString;
        postalCode: z.ZodString;
        country: z.ZodString;
        phone: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        firstName: string;
        lastName: string;
        addressLine1: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
        company?: string | undefined;
        addressLine2?: string | undefined;
        phone?: string | undefined;
    }, {
        firstName: string;
        lastName: string;
        addressLine1: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
        company?: string | undefined;
        addressLine2?: string | undefined;
        phone?: string | undefined;
    }>;
    billingAddress: z.ZodOptional<z.ZodObject<{
        firstName: z.ZodString;
        lastName: z.ZodString;
        company: z.ZodOptional<z.ZodString>;
        addressLine1: z.ZodString;
        addressLine2: z.ZodOptional<z.ZodString>;
        city: z.ZodString;
        state: z.ZodString;
        postalCode: z.ZodString;
        country: z.ZodString;
        phone: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        firstName: string;
        lastName: string;
        addressLine1: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
        company?: string | undefined;
        addressLine2?: string | undefined;
        phone?: string | undefined;
    }, {
        firstName: string;
        lastName: string;
        addressLine1: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
        company?: string | undefined;
        addressLine2?: string | undefined;
        phone?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    items: {
        productId: string;
        quantity: number;
    }[];
    shippingAddress: {
        firstName: string;
        lastName: string;
        addressLine1: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
        company?: string | undefined;
        addressLine2?: string | undefined;
        phone?: string | undefined;
    };
    billingAddress?: {
        firstName: string;
        lastName: string;
        addressLine1: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
        company?: string | undefined;
        addressLine2?: string | undefined;
        phone?: string | undefined;
    } | undefined;
}, {
    items: {
        productId: string;
        quantity: number;
    }[];
    shippingAddress: {
        firstName: string;
        lastName: string;
        addressLine1: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
        company?: string | undefined;
        addressLine2?: string | undefined;
        phone?: string | undefined;
    };
    billingAddress?: {
        firstName: string;
        lastName: string;
        addressLine1: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
        company?: string | undefined;
        addressLine2?: string | undefined;
        phone?: string | undefined;
    } | undefined;
}>;
//# sourceMappingURL=validation.d.ts.map