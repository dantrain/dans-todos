import { PrismaClient } from '@prisma/client';
import { AuthenticationError } from 'apollo-server-express';
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';

export interface Context {
  userid: string;
  prisma: PrismaClient;
}

const prisma = new PrismaClient();

const context = ({ req }: ExpressContext): Context => {
  const userid = req.session?.userid;

  if (!userid) throw new AuthenticationError('You must be signed in');

  return { userid, prisma };
};

export default context;
