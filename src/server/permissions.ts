import { shield, rule } from 'graphql-shield';
import { Context } from 'nexus-plugin-prisma/typegen';

const isTodoOwner = rule({ cache: 'strict' })(
  async (_parent, args, ctx: Context) => {
    const todo = await ctx.prisma.todo.findUnique({
      where: { id: args.where.id || undefined },
    });

    return todo?.userid === ctx.userid;
  }
);

const permissions = shield({
  Mutation: {
    updateOneTodo: isTodoOwner,
    deleteOneTodo: isTodoOwner,
  },
});

export default permissions;
