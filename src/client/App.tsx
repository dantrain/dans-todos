import { createContext } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { RelayEnvironmentProvider } from "react-relay";
import { Route, Routes } from "react-router-dom";
import ErrorFallback from "./components/ErrorFallback";
import Home from "./Home";
import NotFound from "./pages/NotFound/NotFound";
import SignIn from "./pages/SignIn/SignIn";
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
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </RelayEnvironmentProvider>
      </ErrorBoundary>
    </Context.Provider>
  );
}

export default App;
