import { InputBase, makeStyles } from '@material-ui/core';
import React, {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useRef,
  useState,
} from 'react';
import { graphql, useMutation } from 'react-relay/hooks';
import { ConnectionHandler } from 'relay-runtime';
import { useConnectionContext } from '../../../../utils/connectionContext';
import { TodoInputCreateMutation } from '../../../../__generated__/TodoInputCreateMutation.graphql';
import { TodosConnectionContext } from '../TodoManager';

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
    width: '100%',
  },
});

const TodoInput = () => {
  const [value, setValue] = useState('');
  const ref = useRef<HTMLInputElement | null>(null);

  const { getConnectionRecord } = useConnectionContext(TodosConnectionContext);
  const [commit] = useMutation<TodoInputCreateMutation>(createMutation);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && value.length) {
        e.preventDefault();
        const text = value.trim();

        if (text) {
          commit({
            variables: { text },
            updater: (store) => {
              const payload = store.getRootField('createOneTodo');

              const connectionRecord = getConnectionRecord(store);

              const edge = ConnectionHandler.createEdge(
                store,
                connectionRecord,
                payload,
                'TodoEdge'
              );

              ConnectionHandler.insertEdgeAfter(connectionRecord, edge);

              connectionRecord.setValue(
                +(connectionRecord.getValue('totalCount') || 0) + 1,
                'totalCount'
              );
            },
          });
        }

        setValue('');
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setValue('');
        ref?.current?.blur();
      }
    },
    [value, commit, getConnectionRecord]
  );

  const s = useStyles();

  return (
    <InputBase
      inputRef={ref}
      className={s.inputBase}
      placeholder="What needs to be done?"
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      autoFocus
      multiline
    />
  );
};

export default TodoInput;
