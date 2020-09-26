import { InputBase, makeStyles } from "@material-ui/core";
import React, {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
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

const useStyles = makeStyles((theme) => ({
  inputBase: {
    width: "100%",
    paddingRight: `${theme.spacing(1)}px`,
  },
}));

type TodoEditInputProps = {
  id: string;
  initialValue: string;
};

const TodoEditInput = ({ id, initialValue }: TodoEditInputProps) => {
  const [value, setValue] = useState(initialValue);
  const ref = useRef<HTMLInputElement | null>(null);
  const s = useStyles();

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const [commit] = useMutation<TodoEditInputEditMutation>(editMutation);

  const handleBlur = useCallback(() => {
    if (value.length) {
      commit({
        variables: { id: +id.replace("Todo", ""), text: value.trim() },
        optimisticResponse: { updateOneTodo: { id, text: value.trim() } },
      });
    } else {
      setValue(initialValue);
    }
  }, [id, value]);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "Escape") {
      e.preventDefault();
      ref?.current?.blur();
    }
  }, []);

  return (
    <InputBase
      inputRef={ref}
      className={s.inputBase}
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      multiline
    />
  );
};

export default TodoEditInput;
