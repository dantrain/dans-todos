import {
  arg,
  enumType,
  mutationType,
  objectType,
  queryType,
} from "@nexus/schema";
import { toGlobalId } from "graphql-relay";

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

export const User = objectType({
  name: "User",
  definition: (t) => {
    t.id("id", { resolve: ({ id }: any) => toGlobalId("User", id) });

    t.connectionField("todos", {
      type: Todo,
      additionalArgs: {
        filter: arg({ type: Filter, default: "ALL" }),
      },
      nodes: ({ id }: any, { filter }, { prisma }) => {
        switch (filter) {
          case "ACTIVE":
            return prisma.todo.findMany({
              orderBy: { createdAt: "asc" },
              where: { userId: id, completed: { equals: false } },
            });
          case "COMPLETED":
            return prisma.todo.findMany({
              orderBy: { createdAt: "asc" },
              where: { userId: id, completed: { equals: true } },
            });
          default:
            return prisma.todo.findMany({
              where: { userId: id },
              orderBy: { createdAt: "asc" },
            });
        }
      },
      extendConnection: (t) => {
        t.int("totalCount", {
          resolve: ({ id }: any, _args, { prisma }) =>
            prisma.todo.count({ where: { userId: id } }),
        });
        t.int("completedCount", {
          resolve: ({ id }: any, _args, { prisma }) =>
            prisma.todo.count({
              where: { userId: id, completed: { equals: true } },
            }),
        });
      },
    });
  },
});

export const Query = queryType({
  definition: (t) => {
    t.field("viewer", {
      type: "User",
      resolve: (_root, _args, { prisma, userId }) =>
        prisma.user.findOne({ where: { id: userId } }),
    });
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
