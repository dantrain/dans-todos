import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Tooltip,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import cn from 'classnames';
import { fromGlobalId } from 'graphql-relay';
import React, { ChangeEvent, useCallback, useRef, useState } from 'react';
import { graphql, useFragment, useMutation } from 'react-relay/hooks';
import { CSSTransition } from 'react-transition-group';
import useHoverDirty from 'react-use/lib/useHoverDirty';
import { ConnectionHandler, SelectorStoreUpdater } from 'relay-runtime';
import { useConnectionContext } from '../../../../utils/connectionContext';
import hasTouchScreen from '../../../../utils/hasTouchScreen';
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

const useStyles = makeStyles({
  deleteButtonHide: {
    opacity: 0,
  },
  deleteButtonEnter: {
    opacity: 0,
    '& svg': {
      transform: 'scale(0.8)',
    },
  },
  deleteButtonEnterActive: {
    opacity: 1,
    transition: 'opacity 150ms cubic-bezier(0.4, 0.0, 0.2, 1)',
    '& svg': {
      transform: 'scale(1)',
      transition: 'transform 150ms cubic-bezier(0.4, 0.0, 0.2, 1)',
    },
  },
  deleteButtonExit: {
    opacity: 1,
  },
  deleteButtonExitActive: {
    opacity: 0,
    transition: 'opacity 75ms cubic-bezier(0.4, 0.0, 0.2, 1)',
  },
  deleteButtonExitDone: {
    opacity: 0,
  },
});

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

  const listItemRef = useRef(null);
  const hovered = useHoverDirty(listItemRef);
  const [focussed, setFocus] = useState(false);
  const showDeleteButton = hasTouchScreen || focussed || hovered;

  const s = useStyles();

  return (
    <ListItem ref={listItemRef}>
      <ListItemIcon>
        <Checkbox checked={completed} onChange={handleToggle} />
      </ListItemIcon>
      <ListItemText
        primary={
          <TodoEditInput id={id!} initialValue={text} completed={completed} />
        }
      />
      <ListItemSecondaryAction>
        <CSSTransition
          in={showDeleteButton}
          timeout={{ enter: 150, exit: 75 }}
          classNames={{
            enter: s.deleteButtonEnter,
            enterActive: s.deleteButtonEnterActive,
            exit: s.deleteButtonExit,
            exitActive: s.deleteButtonExitActive,
            exitDone: s.deleteButtonExitDone,
          }}
        >
          <Tooltip title="Delete">
            <IconButton
              onFocusVisible={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              className={cn({ [s.deleteButtonHide]: !showDeleteButton })}
              onClick={handleDelete}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </CSSTransition>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default TodoListItem;
