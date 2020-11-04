import { Button } from '@material-ui/core';
import React, { useCallback } from 'react';
import { graphql, useMutation } from 'react-relay/hooks';
import { ConnectionHandler, SelectorStoreUpdater } from 'relay-runtime';
import { useConnectionContext } from '../../../../../utils/connectionContext';
import {
  ClearCompletedMutation,
  ClearCompletedMutationResponse,
} from '../../../../../__generated__/ClearCompletedMutation.graphql';
import { TodosConnectionContext } from '../../TodoManager';

const clearCompletedMutation = graphql`
  mutation ClearCompletedMutation {
    deleteManyTodo(where: { completed: { equals: true } }) {
      count
    }
  }
`;

type ClearCompletedProps = {
  disabled: boolean;
};

const ClearCompleted = ({ disabled }: ClearCompletedProps) => {
  const { getConnectionRecord } = useConnectionContext(TodosConnectionContext);
  const [commit] = useMutation<ClearCompletedMutation>(clearCompletedMutation);

  const handleClick = useCallback(() => {
    const updater: SelectorStoreUpdater<ClearCompletedMutationResponse> = (
      store
    ) => {
      const connection = getConnectionRecord(store);

      const completedNodes =
        connection
          .getLinkedRecords('edges')
          ?.map((edge) => edge.getLinkedRecord('node'))
          .filter((node) => node && node.getValue('completed')) ?? [];

      completedNodes?.forEach((node) => {
        ConnectionHandler.deleteNode(connection, node!.getDataID());
      });

      connection.setValue(
        +(connection.getValue('totalCount') || 0) -
          +(connection.getValue('completedCount') || 0),
        'totalCount'
      );

      connection.setValue(0, 'completedCount');
    };

    commit({ variables: {}, optimisticUpdater: updater, updater });
  }, [commit, getConnectionRecord]);

  return (
    <Button color="primary" disabled={disabled} onClick={handleClick}>
      Clear completed
    </Button>
  );
};

export default ClearCompleted;
