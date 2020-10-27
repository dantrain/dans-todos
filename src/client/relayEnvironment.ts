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
  PubSub.publish("FETCH_START");

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
