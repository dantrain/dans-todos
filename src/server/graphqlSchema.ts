import SchemaBuilder from "@pothos/core";
import AuthzPlugin from "@pothos/plugin-authz";
import RelayPlugin, {
  ResolveCursorConnectionArgs,
  decodeGlobalID,
  resolveCursorConnection,
} from "@pothos/plugin-relay";
import { and, asc, eq, gt, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import { writeFileSync } from "fs";
import { lexicographicSortSchema, printSchema } from "graphql";
import postgres from "postgres";
import { Context } from "./context";
import type { Todo, User } from "./dbSchema.js";
import * as dbSchema from "./dbSchema.js";
import * as rules from "./rules.js";

const isProd = process.env.NODE_ENV === "production";

const client = postgres(process.env.DATABASE_URL!, { max: 1 });
const db = drizzle(client, { schema: dbSchema, logger: true });

const builder = new SchemaBuilder<{
  Objects: { User: User; Todo: Todo };
  DefaultEdgesNullability: false;
  Context: Context;
  AuthZRules: keyof typeof rules;
}>({
  plugins: [AuthzPlugin, RelayPlugin],
  relayOptions: {
    clientMutationId: "omit",
    cursorType: "String",
    edgesFieldOptions: {
      nullable: false,
    },
  },
});

// const AffectedRowsOutput = builder
//   .objectRef<{ count: number }>("AffectedRowsOutput")
//   .implement({ fields: (t) => ({ count: t.exposeInt("count") }) });

builder.node("User", {
  id: { resolve: (_) => _.id },
  fields: (t) => ({
    todos: t.connection(
      {
        type: Todo,
        resolve: ({ id }, args) =>
          resolveCursorConnection(
            { args, toCursor: (todo) => todo.id.toString() },
            ({ after, limit }: ResolveCursorConnectionArgs) =>
              db
                .select()
                .from(dbSchema.todos)
                .where(
                  and(
                    eq(dbSchema.todos.userId, id),
                    gt(dbSchema.todos.id, +(after ?? 0))
                  )
                )
                .orderBy(asc(dbSchema.todos.id))
                .limit(limit)
          ),
      },
      {
        fields: (t) => ({
          totalCount: t.int({
            resolve: async (_parent, _args, { userid }) => {
              const result = await db
                .select({ count: sql<number>`count(*)` })
                .from(dbSchema.todos)
                .where(eq(dbSchema.todos.userId, userid));

              return result[0].count;
            },
          }),
          completedCount: t.int({
            resolve: async (_parent, _args, { userid }) => {
              const result = await db
                .select({ count: sql<number>`count(*)` })
                .from(dbSchema.todos)
                .where(
                  and(
                    eq(dbSchema.todos.userId, userid),
                    eq(dbSchema.todos.completed, true)
                  )
                );

              return result[0].count;
            },
          }),
        }),
      }
    ),
  }),
});

const Todo = builder.node("Todo", {
  id: { resolve: (_) => _.id },
  fields: (t) => ({
    text: t.exposeString("text"),
    completed: t.exposeBoolean("completed"),
    createdAt: t.string({
      resolve: ({ createdAt }) => createdAt.toISOString(),
    }),
  }),
});

builder.queryType({
  fields: (t) => ({
    viewer: t.field({
      type: "User",
      resolve: async (_parent, _args, { userid }) => {
        const result = await db
          .select()
          .from(dbSchema.users)
          .where(eq(dbSchema.users.id, userid))
          .limit(1);

        return result[0];
      },
    }),
  }),
});

// builder.mutationType({});

// builder.mutationField("createOneTodo", (t) =>
//   t.field({
//     type: Todo,
//     args: { text: t.arg.string({ required: true }) },
//     resolve: (_parent, args, { userid }) =>
//       prisma.todo.create({ data: { userid, text: args.text } }),
//   })
// );

// builder.mutationField("updateOneTodo", (t) =>
//   t.field({
//     type: Todo,
//     authz: { rules: ["IsTodoOwner"] },
//     args: {
//       id: t.arg.id({ required: true }),
//       text: t.arg.string(),
//       completed: t.arg.boolean(),
//     },
//     resolve: (_parent, args) => {
//       const { id, ...rest } = args;

//       return prisma.todo.update({
//         where: { id: +decodeGlobalID(id as string).id },
//         data: omitBy(rest, isNil),
//       });
//     },
//   })
// );

// builder.mutationField("updateManyTodo", (t) =>
//   t.field({
//     type: AffectedRowsOutput,
//     args: { completed: t.arg.boolean() },
//     resolve: (_parent, args, { userid }) =>
//       prisma.todo.updateMany({ where: { userid }, data: omitBy(args, isNil) }),
//   })
// );

// builder.mutationField("deleteOneTodo", (t) =>
//   t.field({
//     type: Todo,
//     authz: { rules: ["IsTodoOwner"] },
//     args: { id: t.arg.id({ required: true }) },
//     resolve: (_parent, args) =>
//       prisma.todo.delete({
//         where: { id: +decodeGlobalID(args.id as string).id },
//       }),
//   })
// );

// builder.mutationField("deleteManyCompletedTodo", (t) =>
//   t.field({
//     type: AffectedRowsOutput,
//     resolve: (_parent, _args, { userid }) =>
//       prisma.todo.deleteMany({
//         where: { AND: [{ userid }, { completed: true }] },
//       }),
//   })
// );

const schema = builder.toSchema({});

if (!isProd) {
  const schemaAsString = printSchema(lexicographicSortSchema(schema));

  writeFileSync("src/server/__generated__/schema.graphql", schemaAsString);
}

export default schema;
