import { Card } from "@mui/material";
import { capitalize } from "lodash-es";
import { useLocation } from "react-router-dom";
import Page from "../../components/Page";
import Suspense from "../../components/Suspense";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import preloadComponent from "../../utils/preloadComponent";
import SkeletonTodoManager from "./SkeletonTodoManager";

const TodoManager = preloadComponent(import("./TodoManager"));

export type Filter = "active" | "completed" | "all";

const Home = () => {
  const { pathname } = useLocation();
  const filter = (pathname.replace("/", "").toLowerCase() as Filter) || "all";

  useDocumentTitle(filter !== "all" ? capitalize(filter) : "");

  return (
    <Page>
      <Card>
        <Suspense fallback={<SkeletonTodoManager />}>
          <TodoManager filter={filter} />
        </Suspense>
      </Card>
    </Page>
  );
};

export default Home;
