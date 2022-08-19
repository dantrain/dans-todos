import { CardHeader, Divider, List } from "@mui/material";
import React from "react";
import { graphql, useLazyLoadQuery } from "react-relay";
import {
  Filter,
  TodoManagerQuery,
} from "./__generated__/TodoManagerQuery.graphql";

const query = graphql`
  query TodoManagerQuery($filter: Filter) {
    viewer {
      todos(first: 50, filter: $filter) {
        __id
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

const TodoManager = ({ filter }: { filter: Filter }) => {
  const {
    viewer: { todos },
  } = useLazyLoadQuery<TodoManagerQuery>(query, { filter });

  return (
    <>
      <CardHeader />
      {todos.edges.length ? (
        <>
          <Divider />
          <List>
            {todos.edges.map((edge) => (
              <div>{edge.node.text}</div>
            ))}
          </List>
        </>
      ) : null}
    </>
  );
};

export default TodoManager;
