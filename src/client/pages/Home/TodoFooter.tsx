import { ButtonGroup, css, Divider, Toolbar, Typography } from "@mui/material";
import { graphql, useFragment } from "react-relay/hooks";
import tw from "twin.macro";
import ClearCompleted from "./ClearCompleted";
import FilterLink from "./FilterLink";
import { TodoFooterFragment$key } from "./__generated__/TodoFooterFragment.graphql";

const fragment = graphql`
  fragment TodoFooterFragment on UserTodosConnection {
    totalCount
    completedCount
  }
`;

const TodoFooter = ({ todos }: { todos: TodoFooterFragment$key }) => {
  const { totalCount, completedCount } = useFragment(fragment, todos);
  const incompleteCount = totalCount - completedCount;

  return totalCount ? (
    <>
      <Divider />
      <Toolbar tw="flex flex-wrap justify-between px-4 py-2">
        <Typography tw="min-w-[100px]" color="textSecondary">
          {incompleteCount} item{incompleteCount !== 1 && "s"} left
        </Typography>
        <ButtonGroup
          color="primary"
          size="small"
          css={[
            tw`justify-center order-first pt-1 pb-4 mb-2 -mx-6 sm:flex-initial sm:order-none sm:border-none sm:m-auto sm:p-0`,
            css`
              flex: 1 0 100%;
              border-bottom: 1px solid rgba(0, 0, 0, 0.12);
            `,
          ]}
        >
          <FilterLink to="/" end>
            All
          </FilterLink>
          <FilterLink to="/active">Active</FilterLink>
          <FilterLink to="/completed">Completed</FilterLink>
        </ButtonGroup>
        {<ClearCompleted disabled={incompleteCount === totalCount} />}
      </Toolbar>
    </>
  ) : null;
};

export default TodoFooter;
