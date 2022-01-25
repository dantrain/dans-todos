import { IconButton, Tooltip } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import React, { useCallback } from 'react';
import { graphql, useFragment, useMutation } from 'react-relay/hooks';
import { SelectorStoreUpdater } from 'relay-runtime';
import { useConnectionContext } from '../../../../utils/connectionContext';
import { ToggleAllFragment$key } from '../../../../__generated__/ToggleAllFragment.graphql';
import {
  ToggleAllSetAllCompletedMutation,
  ToggleAllSetAllCompletedMutationResponse,
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

const useStyles = makeStyles((theme) => ({
  icon: ({ allCompleted }: { allCompleted: boolean }) => ({
    color: allCompleted
      ? theme.palette.text.primary
      : theme.palette.text.secondary,
  }),
}));

type ToggleAllProps = {
  todos: ToggleAllFragment$key;
};

const ToggleAll = ({ todos }: ToggleAllProps) => {
  const { totalCount, completedCount } = useFragment(fragment, todos);
  const { getConnectionRecord } = useConnectionContext(TodosConnectionContext);
  const allCompleted = totalCount! > 0 && completedCount === totalCount;
  const s = useStyles({ allCompleted });

  const [commit] = useMutation<ToggleAllSetAllCompletedMutation>(
    setAllCompletedMutation
  );

  const handleClick = useCallback(() => {
    const updater: SelectorStoreUpdater<ToggleAllSetAllCompletedMutationResponse> = (
      store
    ) => {
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
    };

    commit({
      variables: { completed: !allCompleted },
      optimisticUpdater: updater,
      updater,
    });
  }, [commit, allCompleted, getConnectionRecord]);

  return (
    <Tooltip
      title={`Mark all ${allCompleted ? 'in' : ''}complete`}
      placement="top"
      enterDelay={500}
    >
      <IconButton className={s.icon} onClick={handleClick} size="large">
        <DoneAllIcon />
      </IconButton>
    </Tooltip>
  );
};

export default ToggleAll;
