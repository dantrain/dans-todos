import { IconButton } from "@material-ui/core";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import { graphql, useMutation } from "react-relay/hooks";
import React, { useCallback } from "react";
import {
  ToggleAllSetAllCompletedMutation,
  ToggleAllSetAllCompletedMutationResponse,
} from "../../../__generated__/ToggleAllSetAllCompletedMutation.graphql";
import { ConnectionHandler, SelectorStoreUpdater } from "relay-runtime";

const setAllCompletedMutation = graphql`
  mutation ToggleAllSetAllCompletedMutation($completed: Boolean) {
    updateManyTodo(data: { completed: { set: $completed } }) {
      count
    }
  }
`;

const ToggleAll = () => {
  const [commit] = useMutation<ToggleAllSetAllCompletedMutation>(
    setAllCompletedMutation
  );

  const handleClick = useCallback(() => {
    const updater: SelectorStoreUpdater<ToggleAllSetAllCompletedMutationResponse> = (
      store
    ) => {
      const connection = ConnectionHandler.getConnection(
        store.getRoot(),
        "TodoList_todos"
      );
      if (!connection) throw new Error("Can't find connection");
      connection
        .getLinkedRecords("edges")
        ?.forEach((edge) =>
          edge.getLinkedRecord("node")?.setValue(true, "completed")
        );
      connection.setValue(connection.getValue("totalCount"), "completedCount");
    };

    commit({
      variables: { completed: true },
      optimisticUpdater: updater,
      updater,
    });
  }, []);

  return (
    <IconButton onClick={handleClick}>
      <DoneAllIcon />
    </IconButton>
  );
};

export default ToggleAll;
