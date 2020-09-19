import {
  Button,
  Checkbox,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Toolbar,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import React from "react";
import { graphql, useLazyLoadQuery } from "react-relay/hooks";
import { TodoListQuery } from "../../../__generated__/TodoListQuery.graphql";

const query = graphql`
  query TodoListQuery {
    todos(orderBy: { created_at: asc }) {
      id
      text
      completed
    }
    incomplete: todos(where: { completed: { equals: false } }) {
      id
    }
  }
`;

const TodoList = () => {
  const { todos, incomplete } = useLazyLoadQuery<TodoListQuery>(query, {});

  return (
    <>
      <List>
        {todos.map(({ id, text, completed }) => (
          <ListItem key={id}>
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
        ))}
      </List>
      <Divider />
      <Toolbar>
        <Typography color="textSecondary">
          {incomplete.length} items left
        </Typography>
        <ToggleButtonGroup value="all" size="small" exclusive>
          <ToggleButton value="all">All</ToggleButton>
          <ToggleButton value="active">Active</ToggleButton>
          <ToggleButton value="completed">Completed</ToggleButton>
        </ToggleButtonGroup>
        <Button variant="outlined" color="primary">
          Clear completed
        </Button>
      </Toolbar>
    </>
  );
};

export default TodoList;
