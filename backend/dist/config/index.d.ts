declare const config: {
    NODE_ENV: string;
    PORT: number;
    DATABASE_URL: string;
    JWT_SECRET: string;
    JWT_REFRESH_SECRET: string;
    JWT_EXPIRES_IN: string;
    JWT_REFRESH_EXPIRES_IN: string;
    stripe: {
        secretKey: string;
        webhookSecret: string;
    };
    FRONTEND_URL: string;
    BCRYPT_ROUNDS: number;
};
export { config };
export default config;
//# sourceMappingURL=index.d.ts.map