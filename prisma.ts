import { PrismaClient } from "@prisma/client";

// Best practice: create a single, shared instance of the Prisma Client.
// This prevents creating too many database connections.
export const prisma = new PrismaClient();
