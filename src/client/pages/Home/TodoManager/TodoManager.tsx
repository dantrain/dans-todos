import { CardHeader, Divider, List } from '@mui/material';
import React from 'react';
import { graphql, useLazyLoadQuery } from 'react-relay/hooks';
import { createConnectionContext } from '../../../utils/connectionContext';
import {
  Filter,
  TodoManagerQuery,
} from '../../../__generated__/TodoManagerQuery.graphql';
import TodoFooter from './TodoFooter/TodoFooter';
import TodoInput from './TodoInput/TodoInput';
import TodoListItem from './TodoListItem/TodoListItem';
import ToggleAll from './ToggleAll/ToggleAll';

export const [TodosConnectionContext, TodosConnectionProvider] =
  createConnectionContext();

const query = graphql`
  query TodoManagerQuery($filter: Filter) {
    viewer {
      todos(first: 50, filter: $filter) {
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

type TodoManagerProps = {
  filter: Filter;
};

const TodoManager = ({ filter }: TodoManagerProps) => {
  const { viewer } = useLazyLoadQuery<TodoManagerQuery>(query, { filter });
  const { todos } = viewer!;

  return (
    <TodosConnectionProvider connectionId={todos?.__id!}>
      <CardHeader avatar={<ToggleAll todos={todos!} />} title={<TodoInput />} />
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
    </TodosConnectionProvider>
  );
};

export default TodoManager;
