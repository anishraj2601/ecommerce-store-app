import type { CreateCategoryDTO } from "../types";
export declare class CategoryRepository {
    findAll(): Promise<({
        _count: {
            products: number;
        };
        parent: {
            id: string;
            name: string;
            slug: string;
            parentId: string | null;
        } | null;
        children: {
            id: string;
            name: string;
            slug: string;
            parentId: string | null;
        }[];
    } & {
        id: string;
        name: string;
        slug: string;
        parentId: string | null;
    })[]>;
    findById(id: string): Promise<({
        parent: {
            id: string;
            name: string;
            slug: string;
            parentId: string | null;
        } | null;
        children: {
            id: string;
            name: string;
            slug: string;
            parentId: string | null;
        }[];
    } & {
        id: string;
        name: string;
        slug: string;
        parentId: string | null;
    }) | null>;
    findBySlug(slug: string): Promise<{
        id: string;
        name: string;
        slug: string;
        parentId: string | null;
    } | null>;
    create(data: CreateCategoryDTO): Promise<{
        parent: {
            id: string;
            name: string;
            slug: string;
            parentId: string | null;
        } | null;
        children: {
            id: string;
            name: string;
            slug: string;
            parentId: string | null;
        }[];
    } & {
        id: string;
        name: string;
        slug: string;
        parentId: string | null;
    }>;
    update(id: string, data: Partial<CreateCategoryDTO>): Promise<{
        parent: {
            id: string;
            name: string;
            slug: string;
            parentId: string | null;
        } | null;
        children: {
            id: string;
            name: string;
            slug: string;
            parentId: string | null;
        }[];
    } & {
        id: string;
        name: string;
        slug: string;
        parentId: string | null;
    }>;
    delete(id: string): Promise<{
        id: string;
        name: string;
        slug: string;
        parentId: string | null;
    }>;
    hasProducts(id: string): Promise<boolean>;
    hasChildren(id: string): Promise<boolean>;
}
//# sourceMappingURL=category.repo.d.ts.map