import { GraphQLYogaError, YogaInitialContext } from "@graphql-yoga/node";

export interface Context extends YogaInitialContext {
  userid: string;
}

const context = ({ req }: { req: { session?: { userid?: string } } }) => {
  const userid = req.session?.userid;

  if (!userid)
    throw new GraphQLYogaError("You must be signed in", {
      code: "UNAUTHENTICATED",
    });

  return { userid };
};

export default context;
