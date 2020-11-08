import {
  Button,
  ButtonGroup,
  Divider,
  fade,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import indigo from '@material-ui/core/colors/indigo';
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

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    padding: '8px 16px',
  },
  buttonGroup: {
    [theme.breakpoints.down('xs')]: {
      order: -1,
      flex: '1 0 100%',
      justifyContent: 'center',
      padding: '8px 0 16px',
      margin: '0 -24px 8px',
      borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    },
  },
  incompleteCount: {
    minWidth: '100px',
  },
  active: {
    border: `1px solid ${indigo[500]} !important`,
    backgroundColor: `${fade(indigo[500], 0.12)} !important`,
  },
}));

type TodoFooterProps = {
  todos: TodoFooterFragment$key;
};

const TodoFooter = ({ todos }: TodoFooterProps) => {
  const { totalCount, completedCount } = useFragment(fragment, todos);
  const incompleteCount = totalCount! - completedCount!;

  const s = useStyles();

  return totalCount ? (
    <>
      <Divider />
      <Toolbar className={s.toolbar}>
        <Typography className={s.incompleteCount} color="textSecondary">
          {incompleteCount} item{incompleteCount !== 1 && 's'} left
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

export default TodoFooter;
