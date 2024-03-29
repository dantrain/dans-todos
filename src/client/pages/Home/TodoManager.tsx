import { CardHeader, Divider, List } from "@mui/material";
import { graphql, useLazyLoadQuery } from "react-relay";
import { createConnectionContext } from "../../utils/connectionContext";
import { Filter } from "./Home";
import TodoFooter from "./TodoFooter";
import TodoInput from "./TodoInput";
import TodoListItem from "./TodoListItem";
import ToggleAll from "./ToggleAll";
import { TodoManagerQuery } from "./__generated__/TodoManagerQuery.graphql";

export const [TodosConnectionContext, TodosConnectionProvider] =
  createConnectionContext();

const query = graphql`
  query TodoManagerQuery($where: TodoFilter) {
    viewer {
      todos(where: $where) {
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
  const where =
    filter === "active"
      ? { completed: false }
      : filter === "completed"
      ? { completed: true }
      : null;

  const {
    viewer: { todos },
  } = useLazyLoadQuery<TodoManagerQuery>(query, { where });

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
