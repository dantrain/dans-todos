import {
  arg,
  connectionPlugin,
  enumType,
  makeSchema,
  mutationType,
  objectType,
  queryType,
} from "@nexus/schema";
import { nexusSchemaPrisma } from "nexus-plugin-prisma/schema";

const Todo = objectType({
  name: "Todo",
  definition: (t) => {
    t.id("id", { resolve: ({ id }: any) => `Todo${id}` });
    t.model.text();
    t.model.completed();
  },
});

const Filter = enumType({
  name: "Filter",
  members: ["ALL", "ACTIVE", "COMPLETED"],
});

const Query = queryType({
  definition: (t) => {
    t.connectionField("todos", {
      type: Todo,
      additionalArgs: {
        filter: arg({ type: Filter, default: "ALL" }),
      },
      nodes: (_root, { filter }, { prisma }) =>
        prisma.todo.findMany({
          orderBy: { created_at: "asc" },
          ...(filter !== "ALL"
            ? {
                where: {
                  completed: { equals: filter === "COMPLETED" ? true : false },
                },
              }
            : {}),
        }),
      extendConnection: (t) => {
        t.int("totalCount", {
          resolve: (_root, _args, { prisma }) => prisma.todo.count(),
        });
        t.int("completedCount", {
          resolve: (_root, _args, { prisma }) =>
            prisma.todo.count({ where: { completed: { equals: true } } }),
        });
      },
    });
  },
});

const Mutation = mutationType({
  definition: (t) => {
    t.crud.createOneTodo();
    t.crud.updateOneTodo();
    t.crud.updateManyTodo();
    t.crud.deleteOneTodo();
    t.crud.deleteManyTodo();
  },
});

const schema = makeSchema({
  types: [Query, Mutation, Todo, Filter],
  plugins: [nexusSchemaPrisma({ experimentalCRUD: true }), connectionPlugin()],
  outputs: {
    schema: __dirname + "/__generated__/schema.graphql",
    typegen: __dirname + "/__generated__/nexus.ts",
  },
  typegenAutoConfig: {
    contextType: "Context.Context",
    sources: [
      { source: "@prisma/client", alias: "prisma" },
      { source: require.resolve("./context"), alias: "Context" },
    ],
  },
});

export default schema;
