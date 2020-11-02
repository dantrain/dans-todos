import React, { createContext, useCallback, useContext } from 'react';
import {
  ConnectionHandler,
  RecordSourceSelectorProxy,
  Variables,
} from 'relay-runtime';

type ConnectionContextValue = {
  parentId: string;
  connectionKey: string;
  filters?: Variables;
};

export const createConnectionContext = () =>
  createContext<ConnectionContextValue>({ parentId: '', connectionKey: '' });

export const useConnectionContext = (
  context: React.Context<ConnectionContextValue>
) => {
  const { parentId, connectionKey, filters } = useContext<
    ConnectionContextValue
  >(context);

  const getConnectionRecord = useCallback(
    (store: RecordSourceSelectorProxy) => {
      const parentRecord = store.get(parentId);

      if (!parentRecord) {
        throw new Error("Can't find parent record");
      }

      const connectionRecord = ConnectionHandler.getConnection(
        parentRecord,
        connectionKey,
        filters
      );

      if (!connectionRecord) {
        throw new Error("Can't find connection");
      }

      return connectionRecord;
    },
    [parentId, connectionKey, filters]
  );

  return { getConnectionRecord };
};
