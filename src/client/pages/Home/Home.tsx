import {
  Card,
  CardHeader,
  Checkbox,
  Divider,
  InputBase,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import Suspense from "../../components/Suspense/Suspense";
import ToggleAll from "./ToggleAll/ToggleAll";
import TodoList from "./TodoList/TodoList";

const useStyles = makeStyles({
  inputBase: {
    width: "100%",
  },
});

const Home = () => {
  const s = useStyles();

  return (
    <Card>
      <CardHeader
        avatar={
          <Suspense fallback={<Checkbox disabled />}>
            <ToggleAll />
          </Suspense>
        }
        title={
          <InputBase
            className={s.inputBase}
            placeholder="What needs to be done?"
          />
        }
      />
      <Suspense fallback={<></>}>
        <Divider />
        <TodoList />
      </Suspense>
    </Card>
  );
};

export default Home;
