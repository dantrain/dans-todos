import DoneAllIcon from '@mui/icons-material/DoneAll';
import { css, IconButton, Tooltip, useTheme } from '@mui/material';
import React, { useCallback } from 'react';
import { graphql, useFragment, useMutation } from 'react-relay/hooks';
import { SelectorStoreUpdater } from 'relay-runtime';
import { useConnectionContext } from '../../../../utils/connectionContext';
import { ToggleAllFragment$key } from '../../../../__generated__/ToggleAllFragment.graphql';
import {
  ToggleAllSetAllCompletedMutation,
  ToggleAllSetAllCompletedMutation$data,
} from '../../../../__generated__/ToggleAllSetAllCompletedMutation.graphql';
import { TodosConnectionContext } from '../TodoManager';

const fragment = graphql`
  fragment ToggleAllFragment on UserTodos_Connection {
    totalCount
    completedCount
  }
`;

const setAllCompletedMutation = graphql`
  mutation ToggleAllSetAllCompletedMutation($completed: Boolean) {
    updateManyTodo(data: { completed: { set: $completed } }) {
      count
    }
  }
`;

type ToggleAllProps = {
  todos: ToggleAllFragment$key;
};

const ToggleAll = ({ todos }: ToggleAllProps) => {
  const { totalCount, completedCount } = useFragment(fragment, todos);
  const { getConnectionRecord, invalidateConnectionRecords } =
    useConnectionContext(TodosConnectionContext);
  const allCompleted = totalCount > 0 && completedCount === totalCount;
  const theme = useTheme();

  const [commit] = useMutation<ToggleAllSetAllCompletedMutation>(
    setAllCompletedMutation
  );

  const handleClick = useCallback(() => {
    const updater: SelectorStoreUpdater<
      ToggleAllSetAllCompletedMutation$data
    > = (store) => {
      const connectionRecord = getConnectionRecord(store);

      connectionRecord
        .getLinkedRecords('edges')
        ?.forEach((edge) =>
          edge.getLinkedRecord('node')?.setValue(!allCompleted, 'completed')
        );

      connectionRecord.setValue(
        allCompleted ? 0 : connectionRecord.getValue('totalCount'),
        'completedCount'
      );

      invalidateConnectionRecords(store);
    };

    commit({
      variables: { completed: !allCompleted },
      optimisticUpdater: updater,
      updater,
    });
  }, [commit, allCompleted, getConnectionRecord, invalidateConnectionRecords]);

  return (
    <Tooltip
      title={`Mark all ${allCompleted ? 'in' : ''}complete`}
      placement="top"
      enterDelay={500}
    >
      <IconButton
        css={css`
          color: ${allCompleted
            ? theme.palette.text.primary
            : theme.palette.text.secondary};
        `}
        onClick={handleClick}
        size="large"
      >
        <DoneAllIcon />
      </IconButton>
    </Tooltip>
  );
};

export default ToggleAll;
