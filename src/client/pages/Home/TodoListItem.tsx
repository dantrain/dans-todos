import { ClassNames } from "@emotion/react";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { ChangeEvent, useCallback, useRef, useState } from "react";
import { useFragment, useMutation } from "react-relay";
import { CSSTransition } from "react-transition-group";
import { useHoverDirty } from "react-use";
import {
  ConnectionHandler,
  graphql,
  SelectorStoreUpdater,
} from "relay-runtime";
import tw from "twin.macro";
import { useConnectionContext } from "../../utils/connectionContext";
import hasTouchScreen from "../../utils/hasTouchScreen";
import TodoEditInput from "./TodoEditInput";
import { TodosConnectionContext } from "./TodoManager";
import {
  TodoListItemDeleteMutation,
  TodoListItemDeleteMutation$data,
} from "./__generated__/TodoListItemDeleteMutation.graphql";
import { TodoListItemFragment$key } from "./__generated__/TodoListItemFragment.graphql";
import {
  TodoListItemSetCompletedMutation,
  TodoListItemSetCompletedMutation$data,
} from "./__generated__/TodoListItemSetCompletedMutation.graphql";

const fragment = graphql`
  fragment TodoListItemFragment on Todo {
    id
    completed
    ...TodoEditInputFragment
  }
`;

const setCompletedMutation = graphql`
  mutation TodoListItemSetCompletedMutation($id: ID!, $completed: Boolean) {
    updateOneTodo(id: $id, completed: $completed) {
      completed
    }
  }
`;

const deleteMutation = graphql`
  mutation TodoListItemDeleteMutation($id: ID!) {
    deleteOneTodo(id: $id) {
      id
    }
  }
`;

const TodoListItem = ({ todo }: { todo: TodoListItemFragment$key }) => {
  const todoData = useFragment(fragment, todo);
  const { id, completed } = todoData;
  const { getConnectionRecord, invalidateConnectionRecords } =
    useConnectionContext(TodosConnectionContext);

  const [commitToggle] =
    useMutation<TodoListItemSetCompletedMutation>(setCompletedMutation);

  const handleToggle = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const updater: SelectorStoreUpdater<
        TodoListItemSetCompletedMutation$data
      > = (store) => {
        const connectionRecord = getConnectionRecord(store);

        connectionRecord.setValue(
          +(connectionRecord.getValue("completedCount") || 0) +
            (completed ? -1 : 1),
          "completedCount"
        );

        invalidateConnectionRecords(store);
      };

      commitToggle({
        variables: {
          id,
          completed: event.target.checked,
        },
        optimisticResponse: {
          updateOneTodo: { id, completed: event.target.checked },
        },
        optimisticUpdater: updater,
        updater,
      });
    },
    [
      commitToggle,
      id,
      getConnectionRecord,
      completed,
      invalidateConnectionRecords,
    ]
  );

  const [commitDelete] =
    useMutation<TodoListItemDeleteMutation>(deleteMutation);

  const handleDelete = useCallback(() => {
    const updater: SelectorStoreUpdater<TodoListItemDeleteMutation$data> = (
      store
    ) => {
      const connectionRecord = getConnectionRecord(store);

      ConnectionHandler.deleteNode(connectionRecord, id!);

      connectionRecord.setValue(
        +(connectionRecord.getValue("totalCount") || 0) - 1,
        "totalCount"
      );

      if (completed) {
        connectionRecord.setValue(
          +(connectionRecord.getValue("completedCount") || 0) - 1,
          "completedCount"
        );
      }

      invalidateConnectionRecords(store);
    };

    commitDelete({
      variables: { id },
      optimisticUpdater: updater,
      updater,
    });
  }, [
    commitDelete,
    getConnectionRecord,
    id,
    completed,
    invalidateConnectionRecords,
  ]);

  const listItemRef = useRef(null);
  const tooltipRef = useRef(null);

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
              nodeRef={tooltipRef}
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
              <Tooltip ref={tooltipRef} title="Delete">
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
