export declare class UserService {
    private userRepository;
    constructor();
    getUserProfile(userId: string): Promise<{
        id: string;
        email: string;
        name: string | null;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
    }>;
    updateUserProfile(userId: string, data: {
        name?: string;
        email?: string;
    }): Promise<{
        id: string;
        email: string;
        name: string | null;
        role: import(".prisma/client").$Enums.Role;
    }>;
    getUserAddresses(userId: string): Promise<{
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
    }[]>;
    addUserAddress(userId: string, addressData: any): Promise<{
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
}
//# sourceMappingURL=user.service.d.ts.map