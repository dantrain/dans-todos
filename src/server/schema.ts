import { nexusSchemaPrisma } from "nexus-plugin-prisma/schema";
import { intArg, makeSchema, objectType, stringArg } from "@nexus/schema";

const Todo = objectType({
  name: "Todo",
  definition: (t) => {
    t.model.id();
    t.model.text();
    t.model.completed();
  },
});

const Query = objectType({
  name: "Query",
  definition: (t) => {
    t.crud.todo();
    t.crud.todos({ ordering: true, pagination: true });
  },
});

const schema = makeSchema({
  types: [Query, Todo],
  plugins: [nexusSchemaPrisma({ experimentalCRUD: true })],
  outputs: {
    schema: __dirname + "/__generated__/schema.graphql",
    typegen: __dirname + "/__generated__/nexus.ts",
  },
  typegenAutoConfig: {
    contextType: "Context.Context",
    sources: [
      {
        source: "@prisma/client",
        alias: "prisma",
      },
      {
        source: require.resolve("./context"),
        alias: "Context",
      },
    ],
  },
});

export default schema;
