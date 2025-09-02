import type { CreateProductDTO, UpdateProductDTO, ProductFilters } from "../types";
export declare class ProductService {
    private productRepository;
    constructor();
    getProducts(filters: ProductFilters): Promise<{
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
    getProductBySlug(slug: string): Promise<{
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
    getProductById(id: string): Promise<{
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
    createProduct(data: CreateProductDTO): Promise<{
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
    updateProduct(id: string, data: UpdateProductDTO): Promise<{
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
    deleteProduct(id: string): Promise<{
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
//# sourceMappingURL=product.service.d.ts.map