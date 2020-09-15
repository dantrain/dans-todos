import { nexusSchemaPrisma } from "nexus-plugin-prisma/schema";
import { makeSchema, mutationType, objectType, queryType } from "@nexus/schema";

const Todo = objectType({
  name: "Todo",
  definition: (t) => {
    t.model.id();
    t.model.text();
    t.model.completed();
  },
});

const Query = queryType({
  definition: (t) => {
    t.crud.todo();
    t.crud.todos({ ordering: true, filtering: { completed: true } });
  },
});

const Mutation = mutationType({
  definition: (t) => {
    t.crud.createOneTodo();
    t.crud.deleteOneTodo();
    t.crud.updateOneTodo();
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
