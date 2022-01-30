import { ClassNames, css } from '@emotion/react';
import AddIcon from '@mui/icons-material/Add';
import { Fab, InputBase, Tooltip } from '@mui/material';
import React, {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { graphql, useMutation } from 'react-relay/hooks';
import { CSSTransition } from 'react-transition-group';
import { ConnectionHandler } from 'relay-runtime';
import { useConnectionContext } from '../../../../utils/connectionContext';
import hasTouchScreen from '../../../../utils/hasTouchScreen';
import { TodoInputCreateMutation } from '../../../../__generated__/TodoInputCreateMutation.graphql';
import { TodosConnectionContext } from '../TodoManager';

const createMutation = graphql`
  mutation TodoInputCreateMutation($text: String!) {
    createOneTodo(data: { text: $text, completed: false }) {
      id
      ownId
      text
      completed
    }
  }
`;

const TodoInput = () => {
  const [value, setValue] = useState('');
  const ref = useRef<HTMLInputElement | null>(null);
  const text = value.trim();

  const { getConnectionRecord } = useConnectionContext(TodosConnectionContext);
  const [commit] = useMutation<TodoInputCreateMutation>(createMutation);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  const saveText = useCallback(
    (text) => {
      if (text.length) {
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
    },
    [commit, getConnectionRecord]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        saveText(text);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setValue('');
        ref?.current?.blur();
      }
    },
    [saveText, text]
  );

  const [rippling, setRippling] = useState(false);

  const handleClick = useCallback(() => {
    if (!hasTouchScreen) {
      setRippling(true);
    }

    saveText(text);
  }, [saveText, text]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (rippling) {
      timeout = setTimeout(() => setRippling(false), 300);
    }
    return () => clearTimeout(timeout);
  }, [rippling]);

  return (
    <div tw="flex w-full">
      <InputBase
        inputRef={ref}
        tw="w-full mr-4"
        placeholder="What needs to be done?"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        autoFocus
        multiline
      />
      <div
        tw="flex items-center justify-center"
        css={css`
          flex: 0 0 48px;
        `}
      >
        <ClassNames>
          {({ css }) => (
            <CSSTransition
              in={!!text.length || rippling}
              timeout={{ enter: 200, exit: 100 }}
              classNames={{
                enter: css`
                  opacity: 0;
                  transform: scale(0.8);
                `,
                enterActive: css`
                  opacity: 1;
                  transform: scale(1);
                  transition: opacity 200ms cubic-bezier(0.4, 0, 0.2, 1),
                    transform 200ms cubic-bezier(0.4, 0, 0.2, 1);
                `,
                exit: css`
                  opacity: 1;
                `,
                exitActive: css`
                  opacity: 0;
                  transition: opacity 100ms cubic-bezier(0.4, 0, 0.2, 1);
                `,
              }}
              mountOnEnter
              unmountOnExit
            >
              <Tooltip title="Add todo" placement="top">
                <Fab size="small" color="secondary" onClick={handleClick}>
                  <AddIcon />
                </Fab>
              </Tooltip>
            </CSSTransition>
          )}
        </ClassNames>
      </div>
    </div>
  );
};

export default TodoInput;
