import { CardHeader, Divider, List } from "@mui/material";
import { graphql, useLazyLoadQuery } from "react-relay";
import { createConnectionContext } from "../../utils/connectionContext";
import TodoFooter from "./TodoFooter";
import TodoInput from "./TodoInput";
import TodoListItem from "./TodoListItem";
import ToggleAll from "./ToggleAll";
import {
  Filter,
  TodoManagerQuery,
} from "./__generated__/TodoManagerQuery.graphql";

export const [TodosConnectionContext, TodosConnectionProvider] =
  createConnectionContext();

const query = graphql`
  query TodoManagerQuery($filter: Filter) {
    viewer {
      todos(filter: $filter) {
        __id
        edges {
          node {
            id
            ...TodoListItemFragment
          }
        }
        ...ToggleAllFragment
        ...TodoFooterFragment
      }
    }
  }
`;

const TodoManager = ({ filter }: { filter: Filter }) => {
  const {
    viewer: { todos },
  } = useLazyLoadQuery<TodoManagerQuery>(query, { filter });

  return (
    <TodosConnectionProvider connectionId={todos.__id}>
      <CardHeader avatar={<ToggleAll todos={todos} />} title={<TodoInput />} />
      {todos.edges.length ? (
        <>
          <Divider />
          <List>
            {todos.edges.map(({ node }) => (
              <TodoListItem key={node.id} todo={node} />
            ))}
          </List>
        </>
      ) : null}
      <TodoFooter todos={todos} />
    </TodosConnectionProvider>
  );
};

export default TodoManager;
