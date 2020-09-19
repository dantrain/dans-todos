import { nexusSchemaPrisma } from "nexus-plugin-prisma/schema";
import { makeSchema, mutationType, objectType, queryType } from "@nexus/schema";

const Todo = objectType({
  name: "Todo",
  definition: (t) => {
    t.id("id", {
      resolve: ({ id }: any) => Buffer.from(`Todo${id}`).toString("base64"),
    });
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
  plugins: [nexusSchemaPrisma({ experimentalCRUD: true })],
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
