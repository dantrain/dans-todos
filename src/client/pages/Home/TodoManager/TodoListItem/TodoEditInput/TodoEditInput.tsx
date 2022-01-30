import { css, InputBase, useTheme } from '@mui/material';
import React, {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { graphql, useFragment, useMutation } from 'react-relay/hooks';
import tw from 'twin.macro';
import { TodoEditInputEditMutation } from '../../../../../__generated__/TodoEditInputEditMutation.graphql';
import { TodoEditInputFragment$key } from '../../../../../__generated__/TodoEditInputFragment.graphql';

const todoEditInputFragment = graphql`
  fragment TodoEditInputFragment on Todo {
    id
    ownId
    text
    completed
  }
`;

const editMutation = graphql`
  mutation TodoEditInputEditMutation($id: Int, $text: String!) {
    updateOneTodo(where: { id: $id }, data: { text: { set: $text } }) {
      text
    }
  }
`;

type TodoEditInputProps = {
  todo: TodoEditInputFragment$key;
};

const TodoEditInput = ({ todo }: TodoEditInputProps) => {
  const { id, ownId, text, completed } = useFragment(
    todoEditInputFragment,
    todo
  );

  const [value, setValue] = useState(text);
  const ref = useRef<HTMLInputElement | null>(null);
  const theme = useTheme();

  useEffect(() => {
    setValue(text);
  }, [text]);

  const [commit] = useMutation<TodoEditInputEditMutation>(editMutation);

  const handleBlur = useCallback(() => {
    if (value.length) {
      commit({
        variables: { id: ownId, text: value.trim() },
        optimisticResponse: { updateOneTodo: { id, text: value.trim() } },
      });
    } else {
      setValue(text);
    }
  }, [commit, id, ownId, text, value]);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
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
