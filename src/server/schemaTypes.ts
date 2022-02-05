import { toGlobalId } from 'graphql-relay';
import { arg, enumType, mutationType, objectType, queryType } from 'nexus';

export const Todo = objectType({
  name: 'Todo',
  definition: (t) => {
    t.id('id', { resolve: ({ id }: any) => toGlobalId('Todo', id) });
    t.model.id({ alias: 'ownId' });
    t.model.text();
    t.model.completed();
  },
});

export const Filter = enumType({
  name: 'Filter',
  members: ['ALL', 'ACTIVE', 'COMPLETED'],
});

export const User = objectType({
  name: 'User',
  definition: (t) => {
    t.id('id', { resolve: ({ id }: any) => toGlobalId('User', id) });

    t.connectionField('todos', {
      type: Todo,
      additionalArgs: {
        filter: arg({ type: Filter, default: 'ALL' }),
      },
      nodes: ({ id: userid }: any, { filter }, { prisma }) => {
        return prisma.todo.findMany({
          where: {
            userid,
            completed:
              filter === 'COMPLETED'
                ? true
                : filter === 'ACTIVE'
                ? false
                : undefined,
          },
          orderBy: { createdat: 'asc' },
        });
      },
      extendConnection: (t) => {
        t.int('totalCount', {
          resolve: (_root, _args, { prisma, userid }) =>
            prisma.todo.count({ where: { userid } }),
        });
        t.int('completedCount', {
          resolve: (_root, _args, { prisma, userid }) =>
            prisma.todo.count({ where: { userid, completed: true } }),
        });
      },
    });
  },
});

export const Query = queryType({
  definition: (t) => {
    t.field('viewer', {
      type: 'User',
      resolve: (_root, _args, { prisma, userid }) =>
        prisma.user.findUnique({ where: { id: userid } }),
    });
  },
});

export const Mutation = mutationType({
  definition: (t) => {
    t.crud.createOneTodo({
      computedInputs: {
        user: ({ ctx: { userid } }) => ({ connect: { id: userid } }),
      },
    });

    t.crud.updateOneTodo();
    t.crud.deleteOneTodo();

    t.crud.updateManyTodo({
      resolve: (root, args, ctx, info, originalResolve) =>
        originalResolve(
          root,
          { ...args, where: { ...args.where, userid: { equals: ctx.userid } } },
          ctx,
          info
        ),
    });

    t.crud.deleteManyTodo({
      resolve: (root, args, ctx, info, originalResolve) =>
        originalResolve(
          root,
          { ...args, where: { ...args.where, userid: { equals: ctx.userid } } },
          ctx,
          info
        ),
    });
  },
});
