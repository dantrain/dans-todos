import { ClassNames } from '@emotion/react';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Tooltip,
} from '@mui/material';
import React, { ChangeEvent, useCallback, useRef, useState } from 'react';
import { graphql, useFragment, useMutation } from 'react-relay/hooks';
import { CSSTransition } from 'react-transition-group';
import useHoverDirty from 'react-use/lib/useHoverDirty';
import { ConnectionHandler, SelectorStoreUpdater } from 'relay-runtime';
import tw from 'twin.macro';
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
    ownId
    completed
    ...TodoEditInputFragment
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
  const todoData = useFragment(todoListItemFragment, todo);
  const { id, ownId, completed } = todoData;
  const { getConnectionRecord } = useConnectionContext(TodosConnectionContext);

  const [commitToggle] =
    useMutation<TodoListItemSetCompletedMutation>(setCompletedMutation);

  const handleToggle = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const updater: SelectorStoreUpdater<
        TodoListItemSetCompletedMutationResponse
      > = (store) => {
        const connectionRecord = getConnectionRecord(store);
        connectionRecord.setValue(
          +(connectionRecord.getValue('completedCount') || 0) +
            (completed ? -1 : 1),
          'completedCount'
        );
      };

      commitToggle({
        variables: {
          id: ownId,
          completed: event.target.checked,
        },
        optimisticResponse: {
          updateOneTodo: { id, completed: event.target.checked },
        },
        optimisticUpdater: updater,
        updater,
      });
    },
    [commitToggle, id, ownId, getConnectionRecord, completed]
  );

  const [commitDelete] =
    useMutation<TodoListItemDeleteMutation>(deleteMutation);

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
      variables: { id: ownId },
      optimisticUpdater: updater,
      updater,
    });
  }, [commitDelete, id, ownId, getConnectionRecord, completed]);

  const listItemRef = useRef(null);
  const hovered = useHoverDirty(listItemRef);
  const [focussed, setFocus] = useState(false);
  const showDeleteButton = hasTouchScreen || focussed || hovered;

  return (
    <ListItem ref={listItemRef}>
      <ListItemIcon>
        <Checkbox
          checked={completed}
          onChange={handleToggle}
          color="secondary"
        />
      </ListItemIcon>
      <ListItemText primary={<TodoEditInput todo={todoData} />} />
      <ListItemSecondaryAction>
        <ClassNames>
          {({ css }) => (
            <CSSTransition
              in={showDeleteButton}
              timeout={{ enter: 150, exit: 75 }}
              classNames={{
                enter: css`
                  opacity: 0;
                  & svg {
                    transform: scale(0.8);
                  }
                `,
                enterActive: css`
                  opacity: 1;
                  transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);
                  & svg {
                    transform: scale(1);
                    transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
                  }
                `,
                exit: css`
                  opacity: 1;
                `,
                exitActive: css`
                  opacity: 0;
                  transition: opacity 75ms cubic-bezier(0.4, 0, 0.2, 1);
                `,
                exitDone: css`
                  opacity: 0;
                `,
              }}
            >
              <Tooltip title="Delete">
                <IconButton
                  onFocusVisible={() => setFocus(true)}
                  onBlur={() => setFocus(false)}
                  css={[!showDeleteButton && tw`opacity-0`]}
                  onClick={handleDelete}
                  size="large"
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </CSSTransition>
          )}
        </ClassNames>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default TodoListItem;
