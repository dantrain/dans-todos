import { InputBase, makeStyles } from "@material-ui/core";
import React, {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useRef,
  useState,
} from "react";
import { graphql, useMutation } from "react-relay/hooks";
import { ConnectionHandler } from "relay-runtime";
import { TodoInputCreateMutation } from "../../../__generated__/TodoInputCreateMutation.graphql";
import useFilter from "../useFilter/useFilter";

const createMutation = graphql`
  mutation TodoInputCreateMutation($text: String!) {
    createOneTodo(data: { text: $text, completed: false }) {
      id
      text
      completed
    }
  }
`;

const useStyles = makeStyles({
  inputBase: {
    width: "100%",
  },
});

const TodoInput = () => {
  const filter = useFilter();
  const [value, setValue] = useState("");
  const ref = useRef<HTMLInputElement | null>(null);
  const s = useStyles();

  const [commit] = useMutation<TodoInputCreateMutation>(createMutation);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && value.length) {
        commit({
          variables: { text: value.trim() },
          updater: (store) => {
            const payload = store.getRootField("createOneTodo");

            const connection = ConnectionHandler.getConnection(
              store.getRoot(),
              "TodoList_todos",
              { filter }
            );
            if (!connection) throw new Error("Can't find connection");

            const edge = ConnectionHandler.createEdge(
              store,
              connection,
              payload,
              "TodoEdge"
            );

            ConnectionHandler.insertEdgeAfter(connection, edge);

            connection.setValue(
              +(connection.getValue("totalCount") || 0) + 1,
              "totalCount"
            );
          },
        });
        setValue("");
      } else if (e.key === "Escape") {
        setValue("");
        ref?.current?.blur();
      }
    },
    [value, filter]
  );

  return (
    <InputBase
      inputRef={ref}
      className={s.inputBase}
      placeholder="What needs to be done?"
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      autoFocus
    />
  );
};

export default TodoInput;
