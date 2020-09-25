import {
  Button,
  ButtonGroup,
  Divider,
  fade,
  List,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import indigo from "@material-ui/core/colors/indigo";
import React from "react";
import { graphql, useLazyLoadQuery } from "react-relay/hooks";
import { NavLink } from "react-router-dom";
import { TodoListQuery } from "../../../__generated__/TodoListQuery.graphql";
import useFilter from "../useFilter/useFilter";
import ClearCompleted from "./ClearCompleted/ClearCompleted";
import FilterButton from "./FilterButton/FilterButton";
import TodoListItem from "./TodoListItem/TodoListItem";

const query = graphql`
  query TodoListQuery($filter: Filter) {
    todos(first: 50, filter: $filter) @connection(key: "TodoList_todos") {
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
  incompleteCount: {
    minWidth: "100px",
  },
});

const TodoList = () => {
  const filter = useFilter();
  const {
    todos: { edges, totalCount, completedCount },
  } = useLazyLoadQuery<TodoListQuery>(query, { filter });
  const incompleteCount = totalCount - completedCount;

  const s = useStyles();

  return totalCount && edges ? (
    <>
      {edges.length ? (
        <>
          <List>
            {edges.map(
              (edge) =>
                edge?.node && (
                  <TodoListItem key={edge.node.id} todo={edge.node} />
                )
            )}
          </List>
          <Divider />
        </>
      ) : null}
      <Toolbar className={s.toolbar}>
        <Typography className={s.incompleteCount} color="textSecondary">
          {incompleteCount} item{incompleteCount !== 1 && "s"} left
        </Typography>
        <ButtonGroup color="primary" size="small">
          <FilterButton to="/" exact>
            All
          </FilterButton>
          <FilterButton to="/active">Active</FilterButton>
          <FilterButton to="/completed">Completed</FilterButton>
        </ButtonGroup>
        <ClearCompleted disabled={incompleteCount === totalCount} />
      </Toolbar>
    </>
  ) : null;
};

export default TodoList;
