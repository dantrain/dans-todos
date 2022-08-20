import { GraphQLYogaError } from "@graphql-yoga/node";

export type Context = {
  userid: string;
};

const context = ({
  req,
}: {
  req: { session?: { userid?: string } };
}): Context => {
  const userid = req.session?.userid;

  if (!userid)
    throw new GraphQLYogaError("You must be signed in", {
      code: "UNAUTHENTICATED",
    });

  return { userid };
};

export default context;
