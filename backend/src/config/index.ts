import dotenv from "dotenv"

dotenv.config()

const config = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: Number.parseInt(process.env.PORT || "5000"),
  DATABASE_URL: process.env.DATABASE_URL || "postgresql://user:password@localhost:5432/ecommerce",
  JWT_SECRET: process.env.JWT_SECRET || "your-super-secret-jwt-key",
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "your-super-secret-refresh-key",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "15m",
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY || "",
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || "",
  },
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:3000",
  BCRYPT_ROUNDS: Number.parseInt(process.env.BCRYPT_ROUNDS || "12"),
}

export { config }
export default config
