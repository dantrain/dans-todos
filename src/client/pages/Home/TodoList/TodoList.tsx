import {
  Button,
  Divider,
  List,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import React from "react";
import { graphql, useLazyLoadQuery } from "react-relay/hooks";
import { TodoListQuery } from "../../../__generated__/TodoListQuery.graphql";
import TodoListItem from "./TodoListItem/TodoListItem";

const query = graphql`
  query TodoListQuery {
    todos(orderBy: { created_at: asc }) {
      id
      ...TodoListItemFragment
    }
    todosLeftCount
  }
`;

const useStyles = makeStyles({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
});

const TodoList = () => {
  const { todos, todosLeftCount } = useLazyLoadQuery<TodoListQuery>(query, {});
  const s = useStyles();

  return (
    <>
      <List>
        {todos.map((todo) => (
          <TodoListItem key={todo.id} todo={todo} />
        ))}
      </List>
      <Divider />
      <Toolbar className={s.toolbar}>
        <Typography color="textSecondary">
          {todosLeftCount} item{todosLeftCount !== 1 && "s"} left
        </Typography>
        <ToggleButtonGroup value="all" size="small" exclusive>
          <ToggleButton value="all">All</ToggleButton>
          <ToggleButton value="active">Active</ToggleButton>
          <ToggleButton value="completed">Completed</ToggleButton>
        </ToggleButtonGroup>
        <Button color="primary">Clear completed</Button>
      </Toolbar>
    </>
  );
};

export default TodoList;
