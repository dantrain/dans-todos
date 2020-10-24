import {
  arg,
  enumType,
  mutationType,
  objectType,
  queryType,
} from "@nexus/schema";
import { toGlobalId } from "graphql-relay";

export const User = objectType({
  name: "User",
  definition: (t) => {
    t.id("id", { resolve: ({ id }: any) => toGlobalId("User", id) });
    t.model.id({ alias: "userid" });
    t.model.todos();
  },
});

export const Todo = objectType({
  name: "Todo",
  definition: (t) => {
    t.id("id", { resolve: ({ id }: any) => toGlobalId("Todo", id) });
    t.model.id({ alias: "todoid" });
    t.model.text();
    t.model.completed();
  },
});

export const Filter = enumType({
  name: "Filter",
  members: ["ALL", "ACTIVE", "COMPLETED"],
});

export const Query = queryType({
  definition: (t) => {
    t.field("viewer", {
      type: "User",
      resolve: (_root, _args, ctx) =>
        ctx.prisma.user.findOne({ where: { id: ctx.userId } }),
    });

    // t.connectionField("todos", {
    //   type: Todo,
    //   additionalArgs: {
    //     filter: arg({ type: Filter, default: "ALL" }),
    //   },
    //   nodes: (_root, { filter }, { prisma }) => {
    //     switch (filter) {
    //       case "ACTIVE":
    //         return prisma.todo.findMany({
    //           orderBy: { createdAt: "asc" },
    //           where: { completed: { equals: false } },
    //         });
    //       case "COMPLETED":
    //         return prisma.todo.findMany({
    //           orderBy: { createdAt: "asc" },
    //           where: { completed: { equals: true } },
    //         });
    //       default:
    //         return prisma.todo.findMany({ orderBy: { createdAt: "asc" } });
    //     }
    //   },
    //   extendConnection: (t) => {
    //     t.int("totalCount", {
    //       resolve: (_root, _args, { prisma }) => prisma.todo.count(),
    //     });
    //     t.int("completedCount", {
    //       resolve: (_root, _args, { prisma }) =>
    //         prisma.todo.count({ where: { completed: { equals: true } } }),
    //     });
    //   },
    // });
  },
});

export const Mutation = mutationType({
  definition: (t) => {
    t.crud.createOneTodo();
    t.crud.updateOneTodo();
    t.crud.updateManyTodo();
    t.crud.deleteOneTodo();
    t.crud.deleteManyTodo();
  },
});
