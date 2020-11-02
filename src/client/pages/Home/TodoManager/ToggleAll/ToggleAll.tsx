import { IconButton, makeStyles } from "@material-ui/core";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import React, { useCallback } from "react";
import { graphql, useFragment, useMutation } from "react-relay/hooks";
import { SelectorStoreUpdater } from "relay-runtime";
import { useConnectionContext } from "../../../../utils/connectionContext";
import { ToggleAllFragment$key } from "../../../../__generated__/ToggleAllFragment.graphql";
import {
  ToggleAllSetAllCompletedMutation,
  ToggleAllSetAllCompletedMutationResponse,
} from "../../../../__generated__/ToggleAllSetAllCompletedMutation.graphql";
import { TodosConnectionContext } from "../TodoManager";

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
        .getLinkedRecords("edges")
        ?.forEach((edge) =>
          edge.getLinkedRecord("node")?.setValue(!allCompleted, "completed")
        );
      connectionRecord.setValue(
        allCompleted ? 0 : connectionRecord.getValue("totalCount"),
        "completedCount"
      );
    };

    commit({
      variables: { completed: !allCompleted },
      optimisticUpdater: updater,
      updater,
    });
  }, [getConnectionRecord, allCompleted]);

  return (
    <IconButton className={s.icon} onClick={handleClick}>
      <DoneAllIcon />
    </IconButton>
  );
};

export default ToggleAll;
