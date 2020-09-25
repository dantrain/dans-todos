import { Card, CardHeader, Divider } from "@material-ui/core";
import React from "react";
import { RouteProps } from "react-router-dom";
import Suspense from "../../components/Suspense/Suspense";
import { Filter } from "../../__generated__/TodoListQuery.graphql";
import TodoInput from "./TodoInput/TodoInput";
import TodoList from "./TodoList/TodoList";
import ToggleAll from "./ToggleAll/ToggleAll";

const Home = ({ location }: RouteProps) => {
  const filter = (location?.pathname.replace("/", "").toUpperCase() ||
    "ALL") as Filter;

  return (
    <Card>
      <CardHeader avatar={<ToggleAll />} title={<TodoInput />} />
      <Suspense fallback={<></>}>
        <Divider />
        <TodoList filter={filter} />
      </Suspense>
    </Card>
  );
};

export default Home;
