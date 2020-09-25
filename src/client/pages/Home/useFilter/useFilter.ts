import { useLocation } from "react-router-dom";
import { Filter } from "../../../__generated__/TodoListQuery.graphql";

const useFilter = () => {
  const { pathname } = useLocation();

  return (pathname.replace("/", "").toUpperCase() || "ALL") as Filter;
};

export default useFilter;
