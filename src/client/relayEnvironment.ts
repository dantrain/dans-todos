import PubSub from "pubsub-js";
import {
  Environment,
  Network,
  RecordSource,
  RequestParameters,
  Store,
  Variables,
} from "relay-runtime";
import { AuthenticationError, NetworkError } from "./utils/errors";
import signOut from "./utils/signOut";

async function fetchFn(params: RequestParameters, variables: Variables) {
  PubSub.publish("FETCH_START");

  try {
    let response: Response;

    try {
      response = await fetch("/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: params.text,
          variables,
        }),
      });
    } catch (err) {
      throw new NetworkError(err instanceof Error ? err.message : "");
    }

    const data = await response.json();

    if (!response.ok) {
      if (data.errors[0].extensions.code === "UNAUTHENTICATED") {
        signOut();
        throw new AuthenticationError(data.errors[0].message);
      }

      throw new Error(data.errors[0].message || "Something went wrong");
    }

    PubSub.publish("FETCH_SUCCESS");
    return data;
  } catch (err) {
    PubSub.publish("FETCH_FAIL", err);
    throw err;
  } finally {
    PubSub.publish("FETCH_END");
  }
}

export default new Environment({
  network: Network.create(fetchFn),
  store: new Store(new RecordSource()),
});
