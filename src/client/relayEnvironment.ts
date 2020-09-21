import {
  Environment,
  Network,
  RecordSource,
  RequestParameters,
  Store,
  Variables,
} from "relay-runtime";
import PubSub from "pubsub-js";

async function fetchFn(params: RequestParameters, variables: Variables) {
  PubSub.publish("FETCH", "START");

  try {
    const response = await fetch("/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: params.text,
        variables,
      }),
    });

    const data = await response.json();

    return data;
  } finally {
    PubSub.publish("FETCH", "END");
  }
}

export default new Environment({
  network: Network.create(fetchFn),
  store: new Store(new RecordSource()),
});
