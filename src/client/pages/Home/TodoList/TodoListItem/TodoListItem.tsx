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
import useFilter from "../../useFilter/useFilter";
import TodoEditInput from "./TodoEditInput/TodoEditInput";

const todoListItemFragment = graphql`
  fragment TodoListItemFragment on Todo {
    id
    text
    completed
  }
`;

const setCompletedMutation = graphql`
  mutation TodoListItemSetCompletedMutation($id: Int, $completed: Boolean) {
    updateOneTodo(
      where: { id: $id }
      data: { completed: { set: $completed } }
    ) {
      completed
    }
  }
`;

const deleteMutation = graphql`
  mutation TodoListItemDeleteMutation($id: Int) {
    deleteOneTodo(where: { id: $id }) {
      id
    }
  }
`;

type TodoListItemProps = {
  todo: TodoListItemFragment$key;
};

const TodoListItem = ({ todo }: TodoListItemProps) => {
  const { id, text, completed } = useFragment(todoListItemFragment, todo);
  const filter = useFilter();

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
          "TodoList_todos",
          { filter }
        );
        if (!connection) throw new Error("Can't find connection");
        connection.setValue(
          +(connection.getValue("completedCount") || 0) + (completed ? -1 : 1),
          "completedCount"
        );
      };

      commitToggle({
        variables: {
          id: +id.replace("Todo", ""),
          completed: event.target.checked,
        },
        optimisticResponse: {
          updateOneTodo: { id, completed: event.target.checked },
        },
        optimisticUpdater: updater,
        updater,
      });
    },
    [id, completed, filter]
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
        "TodoList_todos",
        { filter }
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
      variables: { id: +id.replace("Todo", "") },
      optimisticUpdater: updater,
      updater,
    });
  }, [id, completed, filter]);

  return (
    <ListItem>
      <ListItemIcon>
        <Checkbox checked={completed} onChange={handleToggle} />
      </ListItemIcon>
      <ListItemText primary={<TodoEditInput id={id} initialValue={text} />} />
      <ListItemSecondaryAction>
        <IconButton onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default TodoListItem;
