/**
 * Checks if an error indicates that the database is unavailable
 * (e.g., DATABASE_URL not set or Prisma client failed to initialize).
 */
export function isDatabaseUnavailable(error: unknown): boolean {
  if (error instanceof Error) {
    if (error.message.includes("DATABASE_URL")) {
      return true;
    }
    if (error.name === "PrismaClientInitializationError") {
      return true;
    }
  }
  return false;
}
