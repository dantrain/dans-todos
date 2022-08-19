import { InputBase, useTheme } from "@mui/material";
import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useFragment } from "react-relay";
import { graphql } from "relay-runtime";
import tw, { css } from "twin.macro";
import { TodoEditInputFragment$key } from "./__generated__/TodoEditInputFragment.graphql";

const fragment = graphql`
  fragment TodoEditInputFragment on Todo {
    id
    text
    completed
  }
`;

const TodoEditInput = ({ todo }: { todo: TodoEditInputFragment$key }) => {
  const { id, text, completed } = useFragment(fragment, todo);

  const [value, setValue] = useState(text);
  const ref = useRef<HTMLInputElement | null>(null);
  const theme = useTheme();

  useEffect(() => {
    setValue(text);
  }, [text]);

  const handleBlur = () => {};

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
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
      css={[
        tw`w-full pr-2`,
        completed &&
          css`
            color: ${theme.palette.text.secondary};
            & textarea:focus {
              color: ${theme.palette.text.primary};
            }
          `,
      ]}
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      multiline
    />
  );
};

export default TodoEditInput;
