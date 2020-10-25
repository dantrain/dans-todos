import { Card, CardHeader } from "@material-ui/core";
import React from "react";
import Suspense from "../../components/Suspense/Suspense";
import SkeletonTodoManager from "./SkeletonTodoManager/SkeletonTodoManager";
import TodoManager from "./TodoManager/TodoManager";

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
