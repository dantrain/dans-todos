import { Button } from "@mui/material";
import { useCallback } from "react";
import { graphql, useMutation } from "react-relay/hooks";
import { ConnectionHandler, SelectorStoreUpdater } from "relay-runtime";
import { useConnectionContext } from "../../utils/connectionContext";
import { TodosConnectionContext } from "./TodoManager";
import {
  ClearCompletedMutation,
  ClearCompletedMutation$data,
} from "./__generated__/ClearCompletedMutation.graphql";

const clearCompletedMutation = graphql`
  mutation ClearCompletedMutation {
    deleteManyCompletedTodo {
      count
    }
  }
`;

const ClearCompleted = ({ disabled }: { disabled: boolean }) => {
  const { getConnectionRecord, invalidateConnectionRecords } =
    useConnectionContext(TodosConnectionContext);
  const [commit] = useMutation<ClearCompletedMutation>(clearCompletedMutation);

  const handleClick = useCallback(() => {
    const updater: SelectorStoreUpdater<ClearCompletedMutation$data> = (
      store
    ) => {
      const connection = getConnectionRecord(store);

      const completedNodes =
        connection
          .getLinkedRecords("edges")
          ?.map((edge) => edge.getLinkedRecord("node"))
          .filter((node) => node && node.getValue("completed")) ?? [];

      completedNodes?.forEach((node) => {
        node && ConnectionHandler.deleteNode(connection, node.getDataID());
      });

      connection.setValue(
        +(connection.getValue("totalCount") || 0) -
          +(connection.getValue("completedCount") || 0),
        "totalCount"
      );

      connection.setValue(0, "completedCount");

      invalidateConnectionRecords(store);
    };

    commit({ variables: {}, optimisticUpdater: updater, updater });
  }, [commit, getConnectionRecord, invalidateConnectionRecords]);

  return (
    <Button color="primary" disabled={disabled} onClick={handleClick}>
      Clear completed
    </Button>
  );
};

export default ClearCompleted;
