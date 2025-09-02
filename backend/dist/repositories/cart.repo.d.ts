export declare class CartRepository {
    findByUserOrSession(userId?: string, sessionId?: string): Promise<({
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
    })[]>;
    findById(id: string): Promise<({
        product: {
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
    }) | null>;
    findByProductAndUser(productId: string, userId?: string, sessionId?: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        productId: string;
        quantity: number;
        sessionId: string | null;
        priceSnapshot: import("@prisma/client/runtime/library").Decimal;
    } | null>;
    create(data: {
        userId?: string;
        sessionId?: string;
        productId: string;
        quantity: number;
        priceSnapshot: number;
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
    updateQuantity(id: string, quantity: number): Promise<{
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
    delete(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        productId: string;
        quantity: number;
        sessionId: string | null;
        priceSnapshot: import("@prisma/client/runtime/library").Decimal;
    }>;
    deleteByUser(userId: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
    deleteBySession(sessionId: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
//# sourceMappingURL=cart.repo.d.ts.map