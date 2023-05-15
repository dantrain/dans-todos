import { GraphQLError } from "graphql";
import { YogaInitialContext } from "graphql-yoga";

export interface Context extends YogaInitialContext {
  userid: string;
}

const context = ({ req }: { req: { session?: { userid?: string } } }) => {
  const userid = req.session?.userid;

  if (!userid)
    throw new GraphQLError("You must be signed in", {
      extensions: {
        code: "UNAUTHENTICATED",
      },
    });

  return { userid };
};

export default context;
