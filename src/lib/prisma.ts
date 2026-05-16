import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  if (!process.env.DATABASE_URL) {
    // Return a proxy that throws a clear error at runtime when DB is unavailable
    // This allows the build to succeed without DATABASE_URL
    return new Proxy({} as PrismaClient, {
      get(_target, prop) {
        if (prop === "then" || prop === Symbol.toPrimitive || prop === Symbol.toStringTag) {
          return undefined;
        }
        throw new Error(
          `Database unavailable: DATABASE_URL is not set. Cannot access prisma.${String(prop)}`
        );
      },
    });
  }
  return new PrismaClient();
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production" && process.env.DATABASE_URL) {
  globalForPrisma.prisma = prisma;
}
