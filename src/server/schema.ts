import { nexusSchemaPrisma } from "nexus-plugin-prisma/schema";
import {
  makeSchema,
  mutationType,
  objectType,
  queryType,
  connectionPlugin,
} from "@nexus/schema";

const Todo = objectType({
  name: "Todo",
  definition: (t) => {
    t.id("id", { resolve: ({ id }: any) => `Todo${id}` });
    t.model.text();
    t.model.completed();
  },
});

const Query = queryType({
  definition: (t) => {
    t.connectionField("todos", {
      type: Todo,
      nodes: (_root, _args, { prisma }) =>
        prisma.todo.findMany({ orderBy: { created_at: "asc" } }),
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
  types: [Query, Mutation, Todo],
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
