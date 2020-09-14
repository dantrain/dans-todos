import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
}

const context: Context = { prisma };

export default context;
