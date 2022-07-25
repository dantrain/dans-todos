import {
  Environment,
  Network,
  RecordSource,
  RequestParameters,
  Store,
  Variables,
} from "relay-runtime";

async function fetchFn(params: RequestParameters, variables: Variables) {
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
      throw new Error(err instanceof Error ? err.message : "");
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.errors[0].message || "Something went wrong");
    }

    return data;
  } catch (err) {
    throw err;
  }
}

export default new Environment({
  network: Network.create(fetchFn),
  store: new Store(new RecordSource()),
});
