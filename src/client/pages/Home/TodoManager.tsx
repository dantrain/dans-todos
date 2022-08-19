import { CardHeader, Divider, List } from "@mui/material";
import React from "react";
import { graphql, useLazyLoadQuery } from "react-relay";
import { createConnectionContext } from "../../utils/connectionContext";
import TodoListItem from "./TodoListItem";
import {
  Filter,
  TodoManagerQuery,
} from "./__generated__/TodoManagerQuery.graphql";

export const [TodosConnectionContext, TodosConnectionProvider] =
  createConnectionContext();

const query = graphql`
  query TodoManagerQuery($filter: Filter) {
    viewer {
      todos(first: 50, filter: $filter) {
        __id
        edges {
          node {
            id
            ...TodoListItemFragment
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
    <TodosConnectionProvider connectionId={todos.__id}>
      <CardHeader />
      {todos.edges.length ? (
        <>
          <Divider />
          <List>
            {todos.edges.map(({ node }) => (
              <TodoListItem key={node.id} todo={node} />
            ))}
          </List>
        </>
      ) : null}
    </TodosConnectionProvider>
  );
};

export default TodoManager;
