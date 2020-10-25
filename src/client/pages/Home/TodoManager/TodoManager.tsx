import { CardHeader, Divider, List } from "@material-ui/core";
import React from "react";
import { graphql, useLazyLoadQuery } from "react-relay/hooks";
import { useLocation } from "react-router-dom";
import { createConnectionContext } from "../../../utils/connectionContext";
import {
  Filter,
  TodoManagerQuery,
} from "../../../__generated__/TodoManagerQuery.graphql";
import TodoFooter from "./TodoFooter/TodoFooter";
import TodoInput from "./TodoInput/TodoInput";
import TodoListItem from "./TodoListItem/TodoListItem";
import ToggleAll from "./ToggleAll/ToggleAll";

export const TodosConnectionContext = createConnectionContext();

const query = graphql`
  query TodoManagerQuery($filter: Filter) {
    viewer {
      id
      todos(first: 50, filter: $filter) @connection(key: "TodoManager_todos") {
        edges {
          node {
            id
            ...TodoListItemFragment
          }
        }
        ...TodoFooterFragment
      }
    }
  }
`;
const TodoManager = () => {
  const { pathname } = useLocation();
  const filter = (pathname.replace("/", "").toUpperCase() || "ALL") as Filter;

  const { viewer } = useLazyLoadQuery<TodoManagerQuery>(query, { filter });
  const { id, todos } = viewer!;

  return (
    <TodosConnectionContext.Provider
      value={{
        parentId: id!,
        connectionKey: "TodoManager_todos",
        filters: { filter },
      }}
    >
      <CardHeader avatar={<ToggleAll />} title={<TodoInput />} />
      {todos!.edges && todos!.edges.length ? (
        <>
          <Divider />
          <List>
            {todos!.edges.map(
              (edge) =>
                edge?.node && (
                  <TodoListItem key={edge.node.id} todo={edge.node} />
                )
            )}
          </List>
        </>
      ) : null}
      <TodoFooter todos={todos!} />
    </TodosConnectionContext.Provider>
  );
};

export default TodoManager;
