import { preExecRule } from "@graphql-authz/core";
import { decodeGlobalID } from "@pothos/plugin-relay";
import { Context } from "./context.js";
import prisma from "./prismaClient.js";

export const IsTodoOwner = preExecRule()(
  async (context: Context, fieldArgs) => {
    const todo = await prisma.todo.findUnique({
      where: { id: +decodeGlobalID(fieldArgs.id as string).id || undefined },
    });

    return todo?.userid === context.userid;
  }
);
