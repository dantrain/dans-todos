import { PrismaClient } from "@prisma/client";

export interface Context {
  prisma: PrismaClient;
}

const context: Context = {
  prisma: new PrismaClient(),
};

export default context;
