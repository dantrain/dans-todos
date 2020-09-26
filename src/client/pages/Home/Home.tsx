import { Card, CardHeader } from "@material-ui/core";
import React from "react";
import Suspense from "../../components/Suspense/Suspense";
import SkeletonTodoList from "./SkeletonTodoList/SkeletonTodoList";
import TodoInput from "./TodoInput/TodoInput";
import TodoList from "./TodoList/TodoList";
import ToggleAll from "./ToggleAll/ToggleAll";

const Home = () => {
  return (
    <Card>
      <CardHeader avatar={<ToggleAll />} title={<TodoInput />} />
      <Suspense fallback={<SkeletonTodoList />}>
        <TodoList />
      </Suspense>
    </Card>
  );
};

export default Home;
