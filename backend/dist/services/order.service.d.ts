import type { CreateOrderDTO } from "../types";
export declare class OrderService {
    private orderRepository;
    private productService;
    private cartService;
    constructor();
    getUserOrders(userId: string, page?: number, limit?: number): Promise<{
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
    getOrderById(orderId: string, userId: string, userRole: string): Promise<{
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
    }>;
    createOrder(userId: string, orderData: CreateOrderDTO): Promise<{
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
    getAllOrders(page?: number, limit?: number, status?: string): Promise<{
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
    updateOrderStatus(orderId: string, status: string): Promise<{
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
    updateOrder(orderId: string, payload: Partial<{
        status: string;
    }>): Promise<{
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
}
//# sourceMappingURL=order.service.d.ts.map