import { preExecRule } from "@graphql-authz/core";
import { decodeGlobalID } from "@pothos/plugin-relay";
import { eq } from "drizzle-orm";
import { Context } from "./context.js";
import { todos } from "./dbSchema.js";
import db from "./drizzleClient.js";

export const IsTodoOwner = preExecRule()(
  async (context: Context, fieldArgs) => {
    const [todo] = await db
      .select()
      .from(todos)
      .where(eq(todos.id, +decodeGlobalID(fieldArgs.id as string)));

    return todo?.userId === context.userid;
  }
);
