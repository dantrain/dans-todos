import { ClassNames } from "@emotion/react";
import { Delete as DeleteIcon } from "@mui/icons-material";
import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { useRef, useState } from "react";
import { useFragment } from "react-relay";
import { CSSTransition } from "react-transition-group";
import { useHoverDirty } from "react-use";
import { graphql } from "relay-runtime";
import tw from "twin.macro";
import hasTouchScreen from "../../utils/hasTouchScreen";
import TodoEditInput from "./TodoEditInput";
import { TodoListItemFragment$key } from "./__generated__/TodoListItemFragment.graphql";

const fragment = graphql`
  fragment TodoListItemFragment on Todo {
    id
    completed
    ...TodoEditInputFragment
  }
`;

const TodoListItem = ({ todo }: { todo: TodoListItemFragment$key }) => {
  const todoData = useFragment(fragment, todo);
  const { id, completed } = todoData;

  const listItemRef = useRef(null);
  const tooltipRef = useRef(null);

  const hovered = useHoverDirty(listItemRef);
  const [focussed, setFocus] = useState(false);
  const showDeleteButton = hasTouchScreen || focussed || hovered;

  const handleToggle = () => {};
  const handleDelete = () => {};

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
