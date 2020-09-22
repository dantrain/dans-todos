import { InputBase, makeStyles } from "@material-ui/core";
import React, {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useRef,
  useState,
} from "react";
import { graphql, useMutation } from "react-relay/hooks";
import { TodoEditInputEditMutation } from "../../../../../__generated__/TodoEditInputEditMutation.graphql";

const editMutation = graphql`
  mutation TodoEditInputEditMutation($id: Int, $text: String!) {
    updateOneTodo(where: { id: $id }, data: { text: { set: $text } }) {
      text
    }
  }
`;

const useStyles = makeStyles({
  inputBase: {
    width: "100%",
  },
});

type TodoEditInputProps = {
  id: string;
  initialValue: string;
};

const TodoEditInput = ({ id, initialValue }: TodoEditInputProps) => {
  const [value, setValue] = useState(initialValue);
  const ref = useRef<HTMLInputElement | null>(null);
  const s = useStyles();

  const [commit] = useMutation<TodoEditInputEditMutation>(editMutation);

  const commitEdit = useCallback(() => {
    commit({
      variables: { id: +id.replace("Todo", ""), text: value.trim() },
    });
    setValue(value.trim());
  }, [id, value]);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && value.length) {
        commitEdit();
        ref?.current?.blur();
      } else if (e.key === "Escape") {
        setValue(initialValue);
        ref?.current?.blur();
      }
    },
    [value, initialValue, commitEdit]
  );

  return (
    <InputBase
      inputRef={ref}
      className={s.inputBase}
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onBlur={commitEdit}
    />
  );
};

export default TodoEditInput;
