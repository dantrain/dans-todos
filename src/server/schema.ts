import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import type PrismaTypes from "@pothos/plugin-prisma/generated";
import RelayPlugin, { decodeGlobalID } from "@pothos/plugin-relay";
import { PrismaClient } from "@prisma/client";
import { writeFileSync } from "fs";
import { lexicographicSortSchema, printSchema } from "graphql";
import { isNil, omitBy } from "lodash-es";

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

const AffectedRowsOutput = builder
  .objectRef<{ count: number }>("AffectedRowsOutput")
  .implement({ fields: (t) => ({ count: t.exposeInt("count") }) });

builder.prismaNode("User", {
  id: { field: "id" },
  fields: (t) => ({
    todos: t.relatedConnection("todos", {
      cursor: "id",
      totalCount: true,
    }),
  }),
});

const Todo = builder.prismaNode("Todo", {
  id: { field: "id" },
  fields: (t) => ({
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

builder.mutationField("updateOneTodo", (t) =>
  t.field({
    type: Todo,
    args: {
      id: t.arg.id({ required: true }),
      text: t.arg.string(),
      completed: t.arg.boolean(),
    },
    resolve: (_parent, args) => {
      const { id, ...rest } = args;

      return prisma.todo.update({
        where: { id: +decodeGlobalID(id as string).id },
        data: omitBy(rest, isNil),
      });
    },
  })
);

builder.mutationField("updateManyTodo", (t) =>
  t.field({
    type: AffectedRowsOutput,
    args: { completed: t.arg.boolean() },
    resolve: (_parent, args) =>
      prisma.todo.updateMany({ data: omitBy(args, isNil) }),
  })
);

builder.mutationField("deleteOneTodo", (t) =>
  t.field({
    type: Todo,
    args: { id: t.arg.id({ required: true }) },
    resolve: (_parent, args) =>
      prisma.todo.delete({
        where: { id: +decodeGlobalID(args.id as string).id },
      }),
  })
);

builder.mutationField("deleteManyCompletedTodo", (t) =>
  t.field({
    type: AffectedRowsOutput,
    resolve: () =>
      prisma.todo.deleteMany({ where: { completed: { equals: true } } }),
  })
);

const schema = builder.toSchema({});

if (!isProd) {
  const schemaAsString = printSchema(lexicographicSortSchema(schema));

  writeFileSync("src/server/__generated__/schema.graphql", schemaAsString);
}

export default schema;
