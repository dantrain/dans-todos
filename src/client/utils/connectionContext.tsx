import {
  Context,
  createContext,
  MutableRefObject,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import { RecordSourceSelectorProxy } from "relay-runtime";

type ConnectionContextValue = {
  connectionId: string;
  connectionSetRef?: MutableRefObject<Set<string>>;
};

export const createConnectionContext = () => {
  const Context = createContext<ConnectionContextValue>({
    connectionId: "",
  });

  const connectionSet: Set<string> = new Set();

  const Provider = ({
    connectionId,
    children,
  }: {
    connectionId: string;
    children: ReactNode;
  }) => {
    const connectionSetRef = useRef(connectionSet);

    useEffect(() => {
      connectionSetRef.current.add(connectionId);
    }, [connectionId]);

    return (
      <Context.Provider value={{ connectionId, connectionSetRef }}>
        {children}
      </Context.Provider>
    );
  };

  return [Context, Provider] as [typeof Context, typeof Provider];
};

export const useConnectionContext = (
  context: Context<ConnectionContextValue>
) => {
  const { connectionId, connectionSetRef } =
    useContext<ConnectionContextValue>(context);

  const getConnectionRecord = useCallback(
    (store: RecordSourceSelectorProxy) => {
      const connectionRecord = store.get(connectionId);

      if (!connectionRecord) {
        throw new Error("Can't find connection");
      }

      return connectionRecord;
    },
    [connectionId]
  );

  const invalidateConnectionRecords = useCallback(
    (store: RecordSourceSelectorProxy) => {
      connectionSetRef?.current.forEach((id) => {
        store.get(id)?.invalidateRecord();
      });
    },
    [connectionSetRef]
  );

  return { getConnectionRecord, invalidateConnectionRecords };
};
