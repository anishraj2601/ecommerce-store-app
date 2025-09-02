import type { CreateUserDTO, LoginDTO } from "../types";
export declare class AuthService {
    private userRepository;
    constructor();
    register(userData: CreateUserDTO): Promise<{
        user: {
            id: string;
            email: string;
            name: string | null;
            role: import(".prisma/client").$Enums.Role;
        };
        tokens: {
            accessToken: string;
            refreshToken: string;
        };
    }>;
    login(credentials: LoginDTO): Promise<{
        user: {
            id: string;
            email: string;
            name: string | null;
            role: import(".prisma/client").$Enums.Role;
        };
        tokens: {
            accessToken: string;
            refreshToken: string;
        };
    }>;
    refreshToken(refreshToken: string): Promise<{
        user: {
            id: string;
            email: string;
            name: string | null;
            role: import(".prisma/client").$Enums.Role;
        };
        tokens: {
            accessToken: string;
            refreshToken: string;
        };
    }>;
}
//# sourceMappingURL=auth.service.d.ts.map