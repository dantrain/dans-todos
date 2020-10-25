import { Divider, List } from "@material-ui/core";
import React from "react";
import { graphql, useFragment } from "react-relay/hooks";
import { TodoListFragment$key } from "../../../../__generated__/TodoListFragment.graphql";
import TodoListItem from "./TodoListItem/TodoListItem";

const fragment = graphql`
  fragment TodoListFragment on UserTodos_Connection {
    edges {
      node {
        id
        ...TodoListItemFragment
      }
    }
  }
`;

type TodoListProps = {
  todos: TodoListFragment$key;
};

const TodoList = ({ todos }: TodoListProps) => {
  const { edges } = useFragment(fragment, todos);

  return edges && edges.length ? (
    <>
      <Divider />
      <List>
        {edges.map(
          (edge) =>
            edge?.node && <TodoListItem key={edge.node.id} todo={edge.node} />
        )}
      </List>
    </>
  ) : null;
};

export default TodoList;
