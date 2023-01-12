import { ClassNames } from "@emotion/react";
import AddIcon from "@mui/icons-material/Add";
import { Fab, InputBase, Tooltip } from "@mui/material";
import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { ConnectionHandler, graphql, useMutation } from "react-relay";
import { CSSTransition } from "react-transition-group";
import { css } from "twin.macro";
import { useConnectionContext } from "../../utils/connectionContext";
import hasTouchScreen from "../../utils/hasTouchScreen";
import { TodosConnectionContext } from "./TodoManager";
import { TodoInputCreateMutation } from "./__generated__/TodoInputCreateMutation.graphql";

const createMutation = graphql`
  mutation TodoInputCreateMutation($text: String!) {
    createOneTodo(text: $text) {
      id
      text
      completed
    }
  }
`;

const TodoInput = () => {
  const [value, setValue] = useState("");

  const inputBaseRef = useRef<HTMLInputElement | null>(null);
  const tooltipRef = useRef(null);

  const text = value.trim();

  const { getConnectionRecord, invalidateConnectionRecords } =
    useConnectionContext(TodosConnectionContext);
  const [commit] = useMutation<TodoInputCreateMutation>(createMutation);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  const saveText = useCallback(
    (text: string) => {
      if (text.length) {
        commit({
          variables: { text },
          updater: (store) => {
            const payload = store.getRootField("createOneTodo");

            const connectionRecord = getConnectionRecord(store);

            const edge = ConnectionHandler.createEdge(
              store,
              connectionRecord,
              payload,
              "TodoEdge"
            );

            ConnectionHandler.insertEdgeAfter(connectionRecord, edge);

            connectionRecord.setValue(
              +(connectionRecord.getValue("totalCount") || 0) + 1,
              "totalCount"
            );

            invalidateConnectionRecords(store);
          },
        });
      }

      setValue("");
    },
    [commit, getConnectionRecord, invalidateConnectionRecords]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        saveText(text);
      } else if (e.key === "Escape") {
        e.preventDefault();
        setValue("");
        inputBaseRef?.current?.blur();
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
        inputRef={inputBaseRef}
        tw="w-full mr-4"
        placeholder="What needs to be done?"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
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
              nodeRef={tooltipRef}
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
              <Tooltip ref={tooltipRef} title="Add todo" placement="top">
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
