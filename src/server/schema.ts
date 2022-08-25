import SchemaBuilder from "@pothos/core";
import AuthzPlugin from "@pothos/plugin-authz";
import PrismaPlugin from "@pothos/plugin-prisma";
import type PrismaTypes from "@pothos/plugin-prisma/generated";
import RelayPlugin, { decodeGlobalID } from "@pothos/plugin-relay";
import { writeFileSync } from "fs";
import { lexicographicSortSchema, printSchema } from "graphql";
import { isNil, omitBy } from "lodash-es";
import { Context } from "./context";
import prisma from "./prismaClient.js";
import * as rules from "./rules.js";

const isProd = process.env.NODE_ENV === "production";

const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes;
  DefaultEdgesNullability: false;
  Context: Context;
  AuthZRules: keyof typeof rules;
}>({
  plugins: [AuthzPlugin, PrismaPlugin, RelayPlugin],
  prisma: {
    client: prisma,
  },
  relayOptions: {
    clientMutationId: "omit",
    cursorType: "String",
    edgesFieldOptions: {
      nullable: false,
    },
  },
});

const AffectedRowsOutput = builder
  .objectRef<{ count: number }>("AffectedRowsOutput")
  .implement({ fields: (t) => ({ count: t.exposeInt("count") }) });

const Filter = builder.enumType("Filter", {
  values: ["all", "active", "completed"],
});

builder.prismaNode("User", {
  id: { field: "id" },
  fields: (t) => ({
    todos: t.relatedConnection(
      "todos",
      {
        cursor: "id",
        totalCount: true,
        args: {
          filter: t.arg({ type: Filter, defaultValue: "all" }),
        },
        query: ({ filter }) => ({
          where: {
            completed:
              filter === "completed"
                ? true
                : filter === "active"
                ? false
                : undefined,
          },
        }),
      },
      {
        fields: (t) => ({
          completedCount: t.int({
            resolve: (_parent, _args, { userid }) =>
              prisma.todo.count({
                where: { AND: [{ userid }, { completed: true }] },
              }),
          }),
        }),
      }
    ),
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
      resolve: async (query, _parent, _args, { userid }) =>
        prisma.user.findUniqueOrThrow({ ...query, where: { id: userid } }),
    }),
  }),
});

builder.mutationType({});

builder.mutationField("createOneTodo", (t) =>
  t.field({
    type: Todo,
    args: { text: t.arg.string({ required: true }) },
    resolve: (_parent, args, { userid }) =>
      prisma.todo.create({ data: { userid, text: args.text } }),
  })
);

builder.mutationField("updateOneTodo", (t) =>
  t.field({
    type: Todo,
    authz: { rules: ["IsTodoOwner"] },
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
    resolve: (_parent, args, { userid }) =>
      prisma.todo.updateMany({ where: { userid }, data: omitBy(args, isNil) }),
  })
);

builder.mutationField("deleteOneTodo", (t) =>
  t.field({
    type: Todo,
    authz: { rules: ["IsTodoOwner"] },
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
    resolve: (_parent, _args, { userid }) =>
      prisma.todo.deleteMany({
        where: { AND: [{ userid }, { completed: true }] },
      }),
  })
);

const schema = builder.toSchema({});

if (!isProd) {
  const schemaAsString = printSchema(lexicographicSortSchema(schema));

  writeFileSync("src/server/__generated__/schema.graphql", schemaAsString);
}

export default schema;
