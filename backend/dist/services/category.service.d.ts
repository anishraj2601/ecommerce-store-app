import type { CreateCategoryDTO } from "../types";
export declare class CategoryService {
    private categoryRepository;
    constructor();
    getCategories(): Promise<({
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
    createCategory(data: CreateCategoryDTO): Promise<{
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
    updateCategory(id: string, data: Partial<CreateCategoryDTO>): Promise<{
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
    deleteCategory(id: string): Promise<{
        id: string;
        name: string;
        slug: string;
        parentId: string | null;
    }>;
}
//# sourceMappingURL=category.service.d.ts.map