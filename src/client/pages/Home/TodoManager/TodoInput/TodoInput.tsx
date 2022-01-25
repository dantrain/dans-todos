import { Fab, InputBase, Tooltip } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import AddIcon from '@mui/icons-material/Add';
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

const useStyles = makeStyles({
  root: {
    display: 'flex',
    width: '100%',
  },
  inputBase: {
    width: '100%',
    marginRight: '16px',
  },
  addButtonWrapper: {
    flex: '0 0 48px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonEnter: {
    opacity: 0,
    transform: 'scale(0.8)',
  },
  addButtonEnterActive: {
    opacity: 1,
    transition:
      'opacity 150ms cubic-bezier(0.4, 0.0, 0.2, 1), transform 150ms cubic-bezier(0.4, 0.0, 0.2, 1)',
    transform: 'scale(1)',
  },
  addButtonExit: {
    opacity: 1,
  },
  addButtonExitActive: {
    opacity: 0,
    transition: 'opacity 75ms cubic-bezier(0.4, 0.0, 0.2, 1)',
  },
});

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

  const s = useStyles();

  return (
    <div className={s.root}>
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
      <div className={s.addButtonWrapper}>
        <CSSTransition
          in={!!text.length || rippling}
          timeout={{ enter: 150, exit: 75 }}
          classNames={{
            enter: s.addButtonEnter,
            enterActive: s.addButtonEnterActive,
            exit: s.addButtonExit,
            exitActive: s.addButtonExitActive,
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
      </div>
    </div>
  );
};

export default TodoInput;
