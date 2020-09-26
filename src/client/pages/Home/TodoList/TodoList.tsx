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

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
  },
  buttonGroup: {
    [theme.breakpoints.down("xs")]: {
      order: -1,
      flex: "1 0 100%",
      justifyContent: "center",
      padding: `${theme.spacing(1)}px 0 ${theme.spacing(2)}px`,
      margin: `0 -${theme.spacing(3)}px ${theme.spacing(1)}px`,
      borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
    },
  },
  incompleteCount: {
    minWidth: "100px",
  },
  active: {
    border: `1px solid ${indigo[500]} !important`,
    backgroundColor: `${fade(indigo[500], 0.12)} !important`,
  },
}));

const TodoList = () => {
  const filter = useFilter();
  const {
    todos: { edges, totalCount, completedCount },
  } = useLazyLoadQuery<TodoListQuery>(query, { filter });
  const incompleteCount = totalCount - completedCount;

  const s = useStyles();

  return totalCount && edges ? (
    <>
      <Divider />
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
        <ButtonGroup color="primary" size="small" className={s.buttonGroup}>
          <Button component={NavLink} to="/" activeClassName={s.active} end>
            All
          </Button>
          <Button component={NavLink} to="/active" activeClassName={s.active}>
            Active
          </Button>
          <Button
            component={NavLink}
            to="/completed"
            activeClassName={s.active}
          >
            Completed
          </Button>
        </ButtonGroup>
        <ClearCompleted disabled={incompleteCount === totalCount} />
      </Toolbar>
    </>
  ) : null;
};

export default TodoList;
