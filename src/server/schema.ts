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
    t.id("id", {
      resolve: ({ id }: any) => Buffer.from(`Todo${id}`).toString("base64"),
    });
    t.model.id({ alias: "todoId" });
    t.model.text();
    t.model.completed();
  },
});

const Query = queryType({
  definition: (t) => {
    t.crud.todo();
    t.crud.todos({
      ordering: { created_at: true },
      filtering: { completed: true },
    });
    t.int("todosCount", {
      resolve: (root, args, { prisma }) => prisma.todo.count(),
    });
    t.int("todosLeftCount", {
      resolve: (root, args, { prisma }) =>
        prisma.todo.count({ where: { completed: { equals: false } } }),
    });

    t.connectionField("allTodos", {
      type: Todo,
      nodes: (root, args, { prisma }) =>
        prisma.todo.findMany({ orderBy: { created_at: "asc" } }),
      extendConnection: (t) => {
        t.int("totalCount", {
          resolve: (root, args, { prisma }) => prisma.todo.count(),
        });
        t.int("completedCount", {
          resolve: (root, args, { prisma }) =>
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
