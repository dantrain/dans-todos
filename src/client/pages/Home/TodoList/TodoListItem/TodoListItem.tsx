import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import React, { ChangeEvent } from "react";
import { graphql, useFragment, useMutation } from "react-relay/hooks";
import { TodoListItemFragment$key } from "../../../../__generated__/TodoListItemFragment.graphql";
import { TodoListItemSetCompletedMutation } from "../../../../__generated__/TodoListItemSetCompletedMutation.graphql";

const todoListItemFragment = graphql`
  fragment TodoListItemFragment on Todo {
    id
    todoId
    text
    completed
  }
`;

const setCompletedMutation = graphql`
  mutation TodoListItemSetCompletedMutation($todoId: Int, $completed: Boolean) {
    updateOneTodo(
      where: { id: $todoId }
      data: { completed: { set: $completed } }
    ) {
      completed
    }
  }
`;

type TodoListItemProps = {
  todo: TodoListItemFragment$key;
};

const TodoListItem = ({ todo }: TodoListItemProps) => {
  const { id, todoId, text, completed } = useFragment(
    todoListItemFragment,
    todo
  );
  const [commit] = useMutation<TodoListItemSetCompletedMutation>(
    setCompletedMutation
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    commit({
      variables: { todoId, completed: event.target.checked },
      optimisticResponse: {
        updateOneTodo: { id, completed: event.target.checked },
      },
    });
  };

  return (
    <ListItem>
      <ListItemIcon>
        <Checkbox checked={completed} onChange={handleChange} />
      </ListItemIcon>
      <ListItemText primary={text} />
      <ListItemSecondaryAction>
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default TodoListItem;
