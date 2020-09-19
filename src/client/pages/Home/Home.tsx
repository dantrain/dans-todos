import {
  Box,
  Card,
  CardHeader,
  Checkbox,
  Divider,
  InputBase,
} from "@material-ui/core";
import React from "react";
import Suspense from "../../components/Suspense/Suspense";
import TodoList from "./TodoList/TodoList";

const Home = () => {
  return (
    <Card>
      <CardHeader
        avatar={<Checkbox />}
        title={<InputBase placeholder="What needs to be done?" />}
      />
      <Divider />
      <Suspense fallback={"Am load..."}>
        <TodoList />
      </Suspense>
    </Card>
  );
};

export default Home;
