import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import type PrismaTypes from "@pothos/plugin-prisma/generated";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({});

const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes;
}>({
  plugins: [PrismaPlugin],
  prisma: {
    client: prisma,
  },
});

builder.prismaObject("User", {
  fields: (t) => ({
    id: t.exposeString("id"),
    todos: t.relation("todos"),
  }),
});

builder.prismaObject("Todo", {
  fields: (t) => ({
    id: t.exposeID("id"),
    text: t.exposeString("text"),
    completed: t.exposeBoolean("completed"),
    createdat: t.string({
      resolve: ({ createdat }) => createdat.toISOString(),
    }),
  }),
});

builder.queryType({
  fields: (t) => ({
    viewer: t.prismaField({
      type: "User",
      resolve: async (query) =>
        prisma.user.findUniqueOrThrow({
          ...query,
          where: { id: "parklife" },
        }),
    }),
  }),
});

const schema = builder.toSchema({});

export default schema;
