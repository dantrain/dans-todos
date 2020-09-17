import React from "react";
import { graphql, useLazyLoadQuery } from "react-relay/hooks";
import { TodoListQuery } from "../../../__generated__/TodoListQuery.graphql";

const query = graphql`
  query TodoListQuery {
    todos(orderBy: { created_at: asc }) {
      id
      text
      completed
    }
  }
`;

const TodoList = () => {
  const { todos } = useLazyLoadQuery<TodoListQuery>(query, {});

  return (
    <ul>
      {todos.map(({ id, text, completed }) => (
        <li key={id}>{text}</li>
      ))}
    </ul>
  );
};

export default TodoList;
