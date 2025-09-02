export declare class UserRepository {
    create(data: {
        email: string;
        passwordHash: string;
        name?: string;
    }): Promise<{
        id: string;
        email: string;
        passwordHash: string;
        name: string | null;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findById(id: string): Promise<({
        addresses: {
            id: string;
            isDefault: boolean;
            firstName: string;
            lastName: string;
            company: string | null;
            addressLine1: string;
            addressLine2: string | null;
            city: string;
            state: string;
            postalCode: string;
            country: string;
            phone: string | null;
            userId: string;
        }[];
    } & {
        id: string;
        email: string;
        passwordHash: string;
        name: string | null;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }) | null>;
    findByEmail(email: string): Promise<{
        id: string;
        email: string;
        passwordHash: string;
        name: string | null;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    update(id: string, data: {
        name?: string;
        email?: string;
    }): Promise<{
        id: string;
        email: string;
        passwordHash: string;
        name: string | null;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }>;
    delete(id: string): Promise<{
        id: string;
        email: string;
        passwordHash: string;
        name: string | null;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }>;
    addAddress(userId: string, addressData: any): Promise<{
        id: string;
        isDefault: boolean;
        firstName: string;
        lastName: string;
        company: string | null;
        addressLine1: string;
        addressLine2: string | null;
        city: string;
        state: string;
        postalCode: string;
        country: string;
        phone: string | null;
        userId: string;
    }>;
    unsetDefaultAddresses(userId: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
//# sourceMappingURL=user.repo.d.ts.map