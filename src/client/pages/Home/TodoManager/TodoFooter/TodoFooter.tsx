import {
  alpha,
  Button,
  ButtonGroup,
  css,
  Divider,
  Toolbar,
  Typography,
} from '@mui/material';
import { indigo } from '@mui/material/colors';
import React from 'react';
import { graphql, useFragment } from 'react-relay/hooks';
import { NavLink } from 'react-router-dom';
import { TodoFooterFragment$key } from '../../../../__generated__/TodoFooterFragment.graphql';
import ClearCompleted from './ClearCompleted/ClearCompleted';

const fragment = graphql`
  fragment TodoFooterFragment on UserTodos_Connection {
    totalCount
    completedCount
  }
`;

const activeStyle = {
  border: `1px solid ${indigo[500]}`,
  backgroundColor: alpha(indigo[500], 0.12),
};

type TodoFooterProps = {
  todos: TodoFooterFragment$key;
};

const TodoFooter = ({ todos }: TodoFooterProps) => {
  const { totalCount, completedCount } = useFragment(fragment, todos);
  const incompleteCount = totalCount! - completedCount!;

  return totalCount ? (
    <>
      <Divider />
      <Toolbar tw="flex flex-wrap justify-between px-4 py-2">
        <Typography tw="min-w-[100px]" color="textSecondary">
          {incompleteCount} item{incompleteCount !== 1 && 's'} left
        </Typography>
        <ButtonGroup
          color="primary"
          size="small"
          tw="justify-center order-first pt-1 pb-4 mb-2 -mx-6 sm:flex-initial sm:order-none sm:border-none sm:m-auto sm:p-0"
          css={css`
            flex: 1 0 100%;
            border-bottom: 1px solid rgba(0, 0, 0, 0.12);
          `}
        >
          <Button component={NavLink} to="/" activeStyle={activeStyle} end>
            All
          </Button>
          <Button component={NavLink} to="/active" activeStyle={activeStyle}>
            Active
          </Button>
          <Button component={NavLink} to="/completed" activeStyle={activeStyle}>
            Completed
          </Button>
        </ButtonGroup>
        <ClearCompleted disabled={incompleteCount === totalCount} />
      </Toolbar>
    </>
  ) : null;
};

export default TodoFooter;
