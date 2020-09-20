import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";
import { graphql, useFragment } from "react-relay/hooks";
import { TodoListItemFragment$key } from "../../../../__generated__/TodoListItemFragment.graphql";

const todoItemFragment = graphql`
  fragment TodoListItemFragment on Todo {
    text
    completed
  }
`;

type TodoListItemProps = {
  todo: TodoListItemFragment$key;
};

const TodoListItem = ({ todo }: TodoListItemProps) => {
  const { text, completed } = useFragment(todoItemFragment, todo);

  return (
    <ListItem>
      <ListItemIcon>
        <Checkbox checked={completed} />
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
