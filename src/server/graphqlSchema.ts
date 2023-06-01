import SchemaBuilder from "@pothos/core";
import AuthzPlugin from "@pothos/plugin-authz";
import RelayPlugin, {
  ResolveCursorConnectionArgs,
  decodeGlobalID,
  resolveCursorConnection,
} from "@pothos/plugin-relay";
import { and, asc, eq, gt, sql } from "drizzle-orm";
import { writeFileSync } from "fs";
import { lexicographicSortSchema, printSchema } from "graphql";
import { isNil, omitBy } from "lodash-es";
import { Context } from "./context";
import { Todo, User, todos, users } from "./dbSchema.js";
import db from "./drizzleClient.js";
import * as rules from "./rules.js";

const isProd = process.env.NODE_ENV === "production";

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

const AffectedRowsOutput = builder
  .objectRef<{ count: number }>("AffectedRowsOutput")
  .implement({ fields: (t) => ({ count: t.exposeInt("count") }) });

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
                .from(todos)
                .where(and(eq(todos.userId, id), gt(todos.id, +(after ?? 0))))
                .orderBy(asc(todos.id))
                .limit(limit)
          ),
      },
      {
        fields: (t) => ({
          totalCount: t.int({
            resolve: async (_parent, _args, { userid }) => {
              const [{ count }] = await db
                .select({ count: sql<number>`count(*)` })
                .from(todos)
                .where(eq(todos.userId, userid));

              return count;
            },
          }),
          completedCount: t.int({
            resolve: async (_parent, _args, { userid }) => {
              const [{ count }] = await db
                .select({ count: sql<number>`count(*)` })
                .from(todos)
                .where(
                  and(eq(todos.userId, userid), eq(todos.completed, true))
                );

              return count;
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
        const [result] = await db
          .select()
          .from(users)
          .where(eq(users.id, userid))
          .limit(1);

        return result;
      },
    }),
  }),
});

builder.mutationType({});

builder.mutationField("createOneTodo", (t) =>
  t.field({
    type: Todo,
    args: { text: t.arg.string({ required: true }) },
    resolve: async (_parent, args, { userid }) => {
      const [result] = await db
        .insert(todos)
        .values({ userId: userid, text: args.text })
        .returning();

      return result;
    },
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
    resolve: async (_parent, args) => {
      const { id, ...rest } = args;

      const [result] = await db
        .update(todos)
        .set(omitBy(rest, isNil))
        .where(eq(todos.id, +decodeGlobalID(id as string).id))
        .returning();

      return result;
    },
  })
);

builder.mutationField("updateManyTodo", (t) =>
  t.field({
    type: AffectedRowsOutput,
    args: { completed: t.arg.boolean() },
    resolve: async (_parent, args, { userid }) => {
      const result = await db
        .update(todos)
        .set(omitBy(args, isNil))
        .where(eq(todos.userId, userid))
        .returning({ updatedId: todos.id });

      return { count: result.length };
    },
  })
);

builder.mutationField("deleteOneTodo", (t) =>
  t.field({
    type: Todo,
    authz: { rules: ["IsTodoOwner"] },
    args: { id: t.arg.id({ required: true }) },
    resolve: async (_parent, args) => {
      const [result] = await db
        .delete(todos)
        .where(eq(todos.id, +decodeGlobalID(args.id as string).id))
        .returning();

      return result;
    },
  })
);

builder.mutationField("deleteManyCompletedTodo", (t) =>
  t.field({
    type: AffectedRowsOutput,
    resolve: async (_parent, _args, { userid }) => {
      const result = await db
        .delete(todos)
        .where(and(eq(todos.userId, userid), eq(todos.completed, true)))
        .returning();

      return { count: result.length };
    },
  })
);

const schema = builder.toSchema({});

if (!isProd) {
  const schemaAsString = printSchema(lexicographicSortSchema(schema));

  writeFileSync("src/server/__generated__/schema.graphql", schemaAsString);
}

export default schema;
