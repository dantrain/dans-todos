import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { fromGlobalId } from 'graphql-relay';
import React, { ChangeEvent, useCallback } from 'react';
import { graphql, useFragment, useMutation } from 'react-relay/hooks';
import { ConnectionHandler, SelectorStoreUpdater } from 'relay-runtime';
import { useConnectionContext } from '../../../../utils/connectionContext';
import {
  TodoListItemDeleteMutation,
  TodoListItemDeleteMutationResponse,
} from '../../../../__generated__/TodoListItemDeleteMutation.graphql';
import { TodoListItemFragment$key } from '../../../../__generated__/TodoListItemFragment.graphql';
import {
  TodoListItemSetCompletedMutation,
  TodoListItemSetCompletedMutationResponse,
} from '../../../../__generated__/TodoListItemSetCompletedMutation.graphql';
import { TodosConnectionContext } from '../TodoManager';
import TodoEditInput from './TodoEditInput/TodoEditInput';

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
  const { getConnectionRecord } = useConnectionContext(TodosConnectionContext);

  const [commitToggle] = useMutation<TodoListItemSetCompletedMutation>(
    setCompletedMutation
  );

  const handleToggle = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const updater: SelectorStoreUpdater<TodoListItemSetCompletedMutationResponse> = (
        store
      ) => {
        const connectionRecord = getConnectionRecord(store);
        connectionRecord.setValue(
          +(connectionRecord.getValue('completedCount') || 0) +
            (completed ? -1 : 1),
          'completedCount'
        );
      };

      commitToggle({
        variables: {
          id: +fromGlobalId(id!).id,
          completed: event.target.checked,
        },
        optimisticResponse: {
          updateOneTodo: { id, completed: event.target.checked },
        },
        optimisticUpdater: updater,
        updater,
      });
    },
    [commitToggle, id, getConnectionRecord, completed]
  );

  const [commitDelete] = useMutation<TodoListItemDeleteMutation>(
    deleteMutation
  );

  const handleDelete = useCallback(() => {
    const updater: SelectorStoreUpdater<TodoListItemDeleteMutationResponse> = (
      store
    ) => {
      const connectionRecord = getConnectionRecord(store);
      ConnectionHandler.deleteNode(connectionRecord, id!);
      connectionRecord.setValue(
        +(connectionRecord.getValue('totalCount') || 0) - 1,
        'totalCount'
      );
      if (completed) {
        connectionRecord.setValue(
          +(connectionRecord.getValue('completedCount') || 0) - 1,
          'completedCount'
        );
      }
    };

    commitDelete({
      variables: { id: +fromGlobalId(id!).id },
      optimisticUpdater: updater,
      updater,
    });
  }, [commitDelete, id, getConnectionRecord, completed]);

  return (
    <ListItem>
      <ListItemIcon>
        <Checkbox checked={completed} onChange={handleToggle} />
      </ListItemIcon>
      <ListItemText
        primary={
          <TodoEditInput id={id!} initialValue={text} completed={completed} />
        }
      />
      <ListItemSecondaryAction>
        <IconButton onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default TodoListItem;
