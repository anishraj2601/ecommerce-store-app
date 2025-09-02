export declare class CartService {
    private cartRepository;
    private productService;
    constructor();
    getCart(userId?: string, sessionId?: string): Promise<{
        items: ({
            product: {
                category: {
                    id: string;
                    name: string;
                    slug: string;
                    parentId: string | null;
                };
            } & {
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
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string | null;
            productId: string;
            quantity: number;
            sessionId: string | null;
            priceSnapshot: import("@prisma/client/runtime/library").Decimal;
        })[];
        total: number;
        itemCount: number;
    }>;
    addToCart(data: {
        userId?: string;
        sessionId?: string;
        productId: string;
        quantity: number;
    }): Promise<{
        product: {
            category: {
                id: string;
                name: string;
                slug: string;
                parentId: string | null;
            };
        } & {
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
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        productId: string;
        quantity: number;
        sessionId: string | null;
        priceSnapshot: import("@prisma/client/runtime/library").Decimal;
    }>;
    updateCartItem(itemId: string, quantity: number, userId?: string): Promise<{
        product: {
            category: {
                id: string;
                name: string;
                slug: string;
                parentId: string | null;
            };
        } & {
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
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        productId: string;
        quantity: number;
        sessionId: string | null;
        priceSnapshot: import("@prisma/client/runtime/library").Decimal;
    }>;
    removeFromCart(itemId: string, userId?: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        productId: string;
        quantity: number;
        sessionId: string | null;
        priceSnapshot: import("@prisma/client/runtime/library").Decimal;
    }>;
    mergeGuestCart(userId: string, sessionId?: string): Promise<{
        items: ({
            product: {
                category: {
                    id: string;
                    name: string;
                    slug: string;
                    parentId: string | null;
                };
            } & {
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
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string | null;
            productId: string;
            quantity: number;
            sessionId: string | null;
            priceSnapshot: import("@prisma/client/runtime/library").Decimal;
        })[];
        total: number;
        itemCount: number;
    }>;
    clearCart(userId?: string, sessionId?: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
//# sourceMappingURL=cart.service.d.ts.map