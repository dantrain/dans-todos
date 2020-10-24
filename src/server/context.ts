import { PrismaClient } from "@prisma/client";
import { AuthenticationError } from "apollo-server-express";
import { ExpressContext } from "apollo-server-express/dist/ApolloServer";

export interface Context {
  userId: string;
  prisma: PrismaClient;
}

const prisma = new PrismaClient();

const context = ({ req }: ExpressContext): Context => {
  const userId = req.session?.userId;

  if (!userId) throw new AuthenticationError("You must be signed in");

  return { userId, prisma };
};

export default context;
