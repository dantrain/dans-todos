import { graphql, useLazyLoadQuery } from "react-relay";
import "twin.macro";
import Suspense from "./Suspense";
import { RelayTestQuery } from "./__generated__/RelayTestQuery.graphql";

const query = graphql`
  query RelayTestQuery {
    viewer {
      todos {
        totalCount
        edges {
          node {
            id
            text
          }
        }
      }
    }
  }
`;

const Loader = () => {
  const data = useLazyLoadQuery<RelayTestQuery>(query, {});

  return (
    <pre tw="text-left bg-gray-100 py-6 px-8 border-solid border-gray-300 rounded-md">
      {JSON.stringify(data.viewer.todos, null, 2)}
    </pre>
  );
};

const RelayTest = () => (
  <Suspense fallback={<p>Loading data...</p>}>
    <Loader />
  </Suspense>
);

export default RelayTest;
