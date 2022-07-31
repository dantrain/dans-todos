import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import type PrismaTypes from "@pothos/plugin-prisma/generated";
import RelayPlugin, { decodeGlobalID } from "@pothos/plugin-relay";
import { PrismaClient } from "@prisma/client";
import { writeFileSync } from "fs";
import { lexicographicSortSchema, printSchema } from "graphql";

const isProd = process.env.NODE_ENV === "production";

const prisma = new PrismaClient({});

const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes;
}>({
  plugins: [PrismaPlugin, RelayPlugin],
  prisma: {
    client: prisma,
  },
  relayOptions: {
    clientMutationId: "omit",
    cursorType: "String",
  },
});

builder.prismaNode("User", {
  id: { field: "id" },
  fields: (t) => ({
    // ownId: t.exposeString("id"),
    todos: t.relatedConnection("todos", {
      cursor: "id",
      totalCount: true,
    }),
  }),
});

const Todo = builder.prismaNode("Todo", {
  id: { field: "id" },
  fields: (t) => ({
    // ownId: t.exposeID("id"),
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

// createOneTodo
builder.mutationType({
  fields: (t) => ({
    createOneTodo: t.field({
      type: Todo,
      args: { text: t.arg.string({ required: true }) },
      resolve: (_parent, args) =>
        prisma.todo.create({
          data: { userid: "parklife", text: args.text },
        }),
    }),
  }),
});

// updateOneTodo
builder.mutationField("updateOneTodo", (t) =>
  t.field({
    type: Todo,
    args: {
      id: t.arg.id({ required: true }),
      completed: t.arg.boolean({ required: true }),
    },
    resolve: (_parent, args) =>
      prisma.todo.update({
        where: { id: +decodeGlobalID(args.id as string).id },
        data: { completed: args.completed },
      }),
  })
);
// updateManyTodo

// deleteOneTodo
// deleteManyTodo

const schema = builder.toSchema({});

if (!isProd) {
  const schemaAsString = printSchema(lexicographicSortSchema(schema));

  writeFileSync("src/server/__generated__/schema.graphql", schemaAsString);
}

export default schema;
