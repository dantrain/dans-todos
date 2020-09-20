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
    todos(first: 50) @connection(key: "TodoList_todos") {
      edges {
        node {
          id
          completed
          ...TodoListItemFragment
        }
      }
      totalCount
      completedCount
    }
  }
`;

const useStyles = makeStyles({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
});

const TodoList = () => {
  const {
    todos: { edges, totalCount, completedCount },
  } = useLazyLoadQuery<TodoListQuery>(query, {});

  const incompleteCount = totalCount - completedCount;

  const s = useStyles();

  return totalCount && edges ? (
    <>
      <List>
        {edges.map(
          (edge) =>
            edge?.node && <TodoListItem key={edge.node.id} todo={edge.node} />
        )}
      </List>
      <Divider />
      <Toolbar className={s.toolbar}>
        <Typography color="textSecondary">
          {incompleteCount} item{incompleteCount !== 1 && "s"} left
        </Typography>
        <ToggleButtonGroup value="all" size="small" exclusive>
          <ToggleButton value="all">All</ToggleButton>
          <ToggleButton value="active">Active</ToggleButton>
          <ToggleButton value="completed">Completed</ToggleButton>
        </ToggleButtonGroup>
        <Button color="primary" disabled={incompleteCount === totalCount}>
          Clear completed
        </Button>
      </Toolbar>
    </>
  ) : null;
};

export default TodoList;
