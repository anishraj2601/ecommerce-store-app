import type { CreateProductDTO, UpdateProductDTO, ProductFilters } from "../types";
export declare class ProductRepository {
    findMany(filters: ProductFilters): Promise<{
        products: ({
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
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    }>;
    findById(id: string): Promise<({
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
    }) | null>;
    findBySlug(slug: string): Promise<({
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
    }) | null>;
    findBySku(sku: string): Promise<{
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
    } | null>;
    create(data: CreateProductDTO): Promise<{
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
    }>;
    update(id: string, data: UpdateProductDTO): Promise<{
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
    }>;
    delete(id: string): Promise<{
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
//# sourceMappingURL=product.repo.d.ts.map