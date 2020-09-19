import { Checkbox } from "@material-ui/core";
import React from "react";
import { graphql, useLazyLoadQuery } from "react-relay/hooks";
import { ToggleAllQuery } from "../../../__generated__/ToggleAllQuery.graphql";

const query = graphql`
  query ToggleAllQuery {
    todosCount
    todosLeftCount
  }
`;

const ToggleAll = () => {
  const { todosCount, todosLeftCount } = useLazyLoadQuery<ToggleAllQuery>(
    query,
    {}
  );

  return (
    <Checkbox indeterminate={todosCount > 0 && todosLeftCount !== todosCount} />
  );
};

export default ToggleAll;
