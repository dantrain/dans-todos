import { Checkbox } from "@material-ui/core";
import React from "react";
import { graphql, useLazyLoadQuery } from "react-relay/hooks";
import { ToggleAllQuery } from "../../../__generated__/ToggleAllQuery.graphql";

const query = graphql`
  query ToggleAllQuery {
    todos(first: 50) {
      totalCount
      completedCount
    }
  }
`;

const ToggleAll = () => {
  const {
    todos: { totalCount, completedCount },
  } = useLazyLoadQuery<ToggleAllQuery>(query, {});

  return (
    <Checkbox
      disabled={totalCount === 0}
      checked={totalCount > 0 && completedCount === totalCount}
      indeterminate={totalCount > 0 && completedCount !== totalCount}
    />
  );
};

export default ToggleAll;
