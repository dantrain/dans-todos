import { IconButton } from "@material-ui/core";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import React, { useCallback } from "react";
import { graphql, useMutation } from "react-relay/hooks";
import { SelectorStoreUpdater } from "relay-runtime";
import { useConnectionContext } from "../../../../utils/connectionContext";
import {
  ToggleAllSetAllCompletedMutation,
  ToggleAllSetAllCompletedMutationResponse,
} from "../../../../__generated__/ToggleAllSetAllCompletedMutation.graphql";
import { TodosConnectionContext } from "../TodoManager";

const setAllCompletedMutation = graphql`
  mutation ToggleAllSetAllCompletedMutation($completed: Boolean) {
    updateManyTodo(data: { completed: { set: $completed } }) {
      count
    }
  }
`;

const ToggleAll = () => {
  const { getConnectionRecord } = useConnectionContext(TodosConnectionContext);

  const [commit] = useMutation<ToggleAllSetAllCompletedMutation>(
    setAllCompletedMutation
  );

  const handleClick = useCallback(() => {
    const updater: SelectorStoreUpdater<ToggleAllSetAllCompletedMutationResponse> = (
      store
    ) => {
      const connectionRecord = getConnectionRecord(store);
      connectionRecord
        .getLinkedRecords("edges")
        ?.forEach((edge) =>
          edge.getLinkedRecord("node")?.setValue(true, "completed")
        );
      connectionRecord.setValue(
        connectionRecord.getValue("totalCount"),
        "completedCount"
      );
    };

    commit({
      variables: { completed: true },
      optimisticUpdater: updater,
      updater,
    });
  }, [getConnectionRecord]);

  return (
    <IconButton onClick={handleClick}>
      <DoneAllIcon />
    </IconButton>
  );
};

export default ToggleAll;
