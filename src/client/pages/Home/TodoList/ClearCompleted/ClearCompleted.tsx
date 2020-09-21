import { Button } from "@material-ui/core";
import React, { useCallback } from "react";
import { graphql, useMutation } from "react-relay/hooks";
import { ConnectionHandler, SelectorStoreUpdater } from "relay-runtime";
import {
  ClearCompletedMutation,
  ClearCompletedMutationResponse,
} from "../../../../__generated__/ClearCompletedMutation.graphql";

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
  const [commit] = useMutation<ClearCompletedMutation>(clearCompletedMutation);

  const handleClick = useCallback(() => {
    const updater: SelectorStoreUpdater<ClearCompletedMutationResponse> = (
      store
    ) => {
      const connection = ConnectionHandler.getConnection(
        store.getRoot(),
        "TodoList_todos"
      );
      if (!connection) throw new Error("Can't find connection");

      const completedNodes =
        connection
          .getLinkedRecords("edges")
          ?.map((edge) => edge.getLinkedRecord("node"))
          .filter((node) => node && node.getValue("completed")) ?? [];

      completedNodes?.forEach((node) => {
        ConnectionHandler.deleteNode(connection, node!.getDataID());
      });

      connection.setValue(
        +(connection.getValue("totalCount") || 0) - completedNodes.length,
        "totalCount"
      );

      connection.setValue(0, "completedCount");
    };

    commit({ variables: {}, optimisticUpdater: updater, updater });
  }, []);

  return (
    <Button color="primary" disabled={disabled} onClick={handleClick}>
      Clear completed
    </Button>
  );
};

export default ClearCompleted;
