import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient({
  transactionOptions: {
    maxWait: 10000, // 10s timeout
    timeout: 10000
  }
});

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
