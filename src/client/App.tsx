import { createContext } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { RelayEnvironmentProvider } from "react-relay";
import ErrorFallback from "./components/ErrorFallback";
import Home from "./Home";
import relayEnvironment from "./relayEnvironment";

export type AppContext = {
  title?: string;
};

declare global {
  interface Window {
    __CONTEXT__: AppContext;
  }
}

let defaultContext: AppContext =
  typeof window !== "undefined" && window.__CONTEXT__ ? window.__CONTEXT__ : {};

export const Context = createContext<AppContext>(defaultContext);

function App({ context = defaultContext }: { context?: AppContext }) {
  return (
    <Context.Provider value={context}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <RelayEnvironmentProvider environment={relayEnvironment}>
          <Home />
        </RelayEnvironmentProvider>
      </ErrorBoundary>
    </Context.Provider>
  );
}

export default App;
