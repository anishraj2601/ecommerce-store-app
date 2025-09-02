export declare class OrderRepository {
    findByUserId(userId: string, page?: number, limit?: number): Promise<{
        orders: ({
            orderItems: ({
                product: {
                    title: string;
                    slug: string;
                    defaultImage: string | null;
                };
            } & {
                id: string;
                productId: string;
                quantity: number;
                priceSnapshot: import("@prisma/client/runtime/library").Decimal;
                orderId: string;
                productTitle: string;
                productImage: string | null;
            })[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            status: import(".prisma/client").$Enums.OrderStatus;
            shippingAddress: import("@prisma/client/runtime/library").JsonValue;
            billingAddress: import("@prisma/client/runtime/library").JsonValue | null;
            total: import("@prisma/client/runtime/library").Decimal;
            orderNumber: string;
            subtotal: import("@prisma/client/runtime/library").Decimal;
            tax: import("@prisma/client/runtime/library").Decimal;
            shipping: import("@prisma/client/runtime/library").Decimal;
            stripePaymentId: string | null;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    }>;
    findById(id: string): Promise<({
        user: {
            email: string;
            name: string | null;
        };
        orderItems: ({
            product: {
                title: string;
                slug: string;
                defaultImage: string | null;
            };
        } & {
            id: string;
            productId: string;
            quantity: number;
            priceSnapshot: import("@prisma/client/runtime/library").Decimal;
            orderId: string;
            productTitle: string;
            productImage: string | null;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        status: import(".prisma/client").$Enums.OrderStatus;
        shippingAddress: import("@prisma/client/runtime/library").JsonValue;
        billingAddress: import("@prisma/client/runtime/library").JsonValue | null;
        total: import("@prisma/client/runtime/library").Decimal;
        orderNumber: string;
        subtotal: import("@prisma/client/runtime/library").Decimal;
        tax: import("@prisma/client/runtime/library").Decimal;
        shipping: import("@prisma/client/runtime/library").Decimal;
        stripePaymentId: string | null;
    }) | null>;
    create(data: {
        userId: string;
        orderNumber: string;
        subtotal: number;
        tax: number;
        shipping: number;
        total: number;
        shippingAddress: any;
        billingAddress: any;
        items: Array<{
            productId: string;
            quantity: number;
            priceSnapshot: number;
            productTitle: string;
            productImage?: string;
        }>;
    }): Promise<{
        orderItems: ({
            product: {
                title: string;
                slug: string;
                defaultImage: string | null;
            };
        } & {
            id: string;
            productId: string;
            quantity: number;
            priceSnapshot: import("@prisma/client/runtime/library").Decimal;
            orderId: string;
            productTitle: string;
            productImage: string | null;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        status: import(".prisma/client").$Enums.OrderStatus;
        shippingAddress: import("@prisma/client/runtime/library").JsonValue;
        billingAddress: import("@prisma/client/runtime/library").JsonValue | null;
        total: import("@prisma/client/runtime/library").Decimal;
        orderNumber: string;
        subtotal: import("@prisma/client/runtime/library").Decimal;
        tax: import("@prisma/client/runtime/library").Decimal;
        shipping: import("@prisma/client/runtime/library").Decimal;
        stripePaymentId: string | null;
    }>;
    findAll(page?: number, limit?: number, status?: string): Promise<{
        orders: ({
            user: {
                email: string;
                name: string | null;
            };
            orderItems: ({
                product: {
                    title: string;
                    slug: string;
                };
            } & {
                id: string;
                productId: string;
                quantity: number;
                priceSnapshot: import("@prisma/client/runtime/library").Decimal;
                orderId: string;
                productTitle: string;
                productImage: string | null;
            })[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            status: import(".prisma/client").$Enums.OrderStatus;
            shippingAddress: import("@prisma/client/runtime/library").JsonValue;
            billingAddress: import("@prisma/client/runtime/library").JsonValue | null;
            total: import("@prisma/client/runtime/library").Decimal;
            orderNumber: string;
            subtotal: import("@prisma/client/runtime/library").Decimal;
            tax: import("@prisma/client/runtime/library").Decimal;
            shipping: import("@prisma/client/runtime/library").Decimal;
            stripePaymentId: string | null;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    }>;
    updateStatus(id: string, status: string): Promise<{
        orderItems: ({
            product: {
                title: string;
                slug: string;
                defaultImage: string | null;
            };
        } & {
            id: string;
            productId: string;
            quantity: number;
            priceSnapshot: import("@prisma/client/runtime/library").Decimal;
            orderId: string;
            productTitle: string;
            productImage: string | null;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        status: import(".prisma/client").$Enums.OrderStatus;
        shippingAddress: import("@prisma/client/runtime/library").JsonValue;
        billingAddress: import("@prisma/client/runtime/library").JsonValue | null;
        total: import("@prisma/client/runtime/library").Decimal;
        orderNumber: string;
        subtotal: import("@prisma/client/runtime/library").Decimal;
        tax: import("@prisma/client/runtime/library").Decimal;
        shipping: import("@prisma/client/runtime/library").Decimal;
        stripePaymentId: string | null;
    }>;
    updateProductInventory(productId: string, quantity: number): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        slug: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        salePrice: import("@prisma/client/runtime/library").Decimal | null;
        sku: string;
        inventory: number;
        categoryId: string;
        images: import("@prisma/client/runtime/library").JsonValue;
        defaultImage: string | null;
        attributes: import("@prisma/client/runtime/library").JsonValue;
        isActive: boolean;
    }>;
}
//# sourceMappingURL=order.repo.d.ts.map