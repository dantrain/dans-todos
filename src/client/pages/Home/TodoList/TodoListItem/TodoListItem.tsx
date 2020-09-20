import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import React, { ChangeEvent, MouseEvent } from "react";
import { graphql, useFragment, useMutation } from "react-relay/hooks";
import { TodoListItemDeleteMutation } from "../../../../__generated__/TodoListItemDeleteMutation.graphql";
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

const deleteMutation = graphql`
  mutation TodoListItemDeleteMutation($todoId: Int) {
    deleteOneTodo(where: { id: $todoId }) {
      id
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

  const [commitToggle] = useMutation<TodoListItemSetCompletedMutation>(
    setCompletedMutation
  );

  const handleToggle = (event: ChangeEvent<HTMLInputElement>) => {
    commitToggle({
      variables: { todoId, completed: event.target.checked },
      optimisticResponse: {
        updateOneTodo: { id, completed: event.target.checked },
      },
    });
  };

  const [commitDelete] = useMutation<TodoListItemDeleteMutation>(
    deleteMutation
  );

  const handleDelete = () => {
    commitDelete({
      variables: { todoId },
      updater: (store) => {
        // store.delete(id);
      },
    });
  };

  return (
    <ListItem>
      <ListItemIcon>
        <Checkbox checked={completed} onChange={handleToggle} />
      </ListItemIcon>
      <ListItemText primary={text} />
      <ListItemSecondaryAction>
        <IconButton onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default TodoListItem;
