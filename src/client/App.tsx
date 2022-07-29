import { css, Global } from "@emotion/react";
import { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { RelayEnvironmentProvider } from "react-relay";
import "twin.macro";
import reactLogo from "./assets/react.svg";
import ErrorFallback from "./components/ErrorFallback";
import RelayTest from "./components/RelayTest";
import SuspenseTest from "./components/SuspenseTest";
import relayEnvironment from "./relayEnvironment";

function App() {
  const [count, setCount] = useState(0);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <RelayEnvironmentProvider environment={relayEnvironment}>
        <div className="App">
          <Global
            styles={css`
              :root {
                font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
                font-size: 16px;
                line-height: 24px;
              }

              body {
                margin: 0;
                display: flex;
                place-items: center;
                min-width: 320px;
                min-height: 100vh;
              }

              #root {
                max-width: 1280px;
                margin: 0 auto;
                padding: 2rem;
                text-align: center;
              }
            `}
          />
          <div>
            <a href="https://vitejs.dev" target="_blank">
              <img src="/vite.svg" className="logo" alt="Vite logo" />
            </a>
            <a href="https://reactjs.org" target="_blank">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </div>
          <h1
            tw="font-sans text-blue-700 text-5xl"
            css={css`
              line-height: 1.1;
            `}
          >
            Vite + React
          </h1>
          <div tw="p-8">
            <button onClick={() => setCount((count) => count + 1)}>
              count is {count}
            </button>
            <p>
              Edit <code>src/App.tsx</code> and save to test HMR
            </p>
          </div>
          <p tw="text-gray-500">
            Click on the Vite and React logos to learn more
          </p>
          <SuspenseTest />
          <RelayTest />
        </div>
      </RelayEnvironmentProvider>
    </ErrorBoundary>
  );
}

export default App;
