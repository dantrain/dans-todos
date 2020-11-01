import { Card } from "@material-ui/core";
import React from "react";
import Suspense from "../../components/Suspense/Suspense";
import preloadComponent from "../../utils/preloadComponent";
import SkeletonTodoManager from "./SkeletonTodoManager/SkeletonTodoManager";

const TodoManager = preloadComponent(import("./TodoManager/TodoManager"));

const Home = () => {
  return (
    <Card>
      <Suspense fallback={<SkeletonTodoManager />}>
        <TodoManager />
      </Suspense>
    </Card>
  );
};

export default Home;
