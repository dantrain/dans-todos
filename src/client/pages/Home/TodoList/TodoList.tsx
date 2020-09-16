import React from "react";
import { graphql, useLazyLoadQuery } from "react-relay/hooks";
import { TodoListQuery } from "../../../__generated__/TodoListQuery.graphql";

const query = graphql`
  query TodoListQuery {
    todos(orderBy: { created_at: asc }) {
      text
      completed
    }
  }
`;

const TodoList = () => {
  const { todos } = useLazyLoadQuery<TodoListQuery>(query, {});

  return <code>{JSON.stringify(todos, null, 4)}</code>;
};

export default TodoList;
