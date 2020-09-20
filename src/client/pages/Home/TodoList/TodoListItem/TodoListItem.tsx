import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import React, { ChangeEvent, useCallback } from "react";
import { graphql, useFragment, useMutation } from "react-relay/hooks";
import { ConnectionHandler, SelectorStoreUpdater } from "relay-runtime";
import {
  TodoListItemDeleteMutation,
  TodoListItemDeleteMutationResponse,
} from "../../../../__generated__/TodoListItemDeleteMutation.graphql";
import { TodoListItemFragment$key } from "../../../../__generated__/TodoListItemFragment.graphql";
import {
  TodoListItemSetCompletedMutation,
  TodoListItemSetCompletedMutationResponse,
} from "../../../../__generated__/TodoListItemSetCompletedMutation.graphql";

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

  const handleToggle = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const updater: SelectorStoreUpdater<TodoListItemSetCompletedMutationResponse> = (
        store
      ) => {
        const connection = ConnectionHandler.getConnection(
          store.getRoot(),
          "TodoList_todos"
        );
        if (!connection) throw new Error("Can't find connection");
        connection.setValue(
          +(connection.getValue("completedCount") || 0) + (completed ? -1 : 1),
          "completedCount"
        );
      };

      commitToggle({
        variables: { todoId, completed: event.target.checked },
        optimisticResponse: {
          updateOneTodo: { id, completed: event.target.checked },
        },
        updater,
      });
    },
    [id, todoId, completed]
  );

  const [commitDelete] = useMutation<TodoListItemDeleteMutation>(
    deleteMutation
  );

  const handleDelete = useCallback(() => {
    const updater: SelectorStoreUpdater<TodoListItemDeleteMutationResponse> = (
      store
    ) => {
      const connection = ConnectionHandler.getConnection(
        store.getRoot(),
        "TodoList_todos"
      );
      if (!connection) throw new Error("Can't find connection");
      ConnectionHandler.deleteNode(connection, id);
      connection.setValue(
        +(connection.getValue("totalCount") || 0) - 1,
        "totalCount"
      );
      if (completed) {
        connection.setValue(
          +(connection.getValue("completedCount") || 0) - 1,
          "completedCount"
        );
      }
    };

    commitDelete({
      variables: { todoId },
      optimisticUpdater: updater,
      updater,
    });
  }, [id, todoId, completed]);

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
