import React from "react";
import logo from "./react.svg";
import Suspense from "../../components/Suspense/Suspense";
import TodoList from "./TodoList/TodoList";

import s from "./Home.module.css";

const Home = () => {
  return (
    <div className={s.root}>
      <div className={s.header}>
        <img src={logo} className={s.logo} alt="logo" />
        <h2>Welcome to Razzle</h2>
      </div>
      <p className={s.intro}>
        To get started, edit <code>src/App.tsx</code> or{" "}
        <code>src/Home.tsx</code> and save to reload.
      </p>
      <ul className={s.resources}>
        <li>
          <a href="https://github.com/jaredpalmer/razzle">Docs</a>
        </li>
        <li>
          <a href="https://github.com/jaredpalmer/razzle/issues">Issues</a>
        </li>
        <li>
          <a href="https://palmer.chat">Community Slack</a>
        </li>
      </ul>
      <Suspense fallback={"Am load..."}>
        <TodoList />
      </Suspense>
    </div>
  );
};

export default Home;
