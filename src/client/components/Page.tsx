import { Global } from "@emotion/react";
import { Container } from "@mui/material";
import { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { css } from "twin.macro";
import AppBar from "./AppBar";
import Error from "./Error";

const Page = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Global
        styles={css`
          body {
            min-height: 100vh;
          }

          #root {
            min-height: 100vh;
            padding: 0.02px 0;
          }
        `}
      />
      <AppBar />
      <Container maxWidth="sm">
        <main
          tw="my-4 sm:my-10"
          css={css`
            min-width: 300px;
          `}
        >
          <ErrorBoundary FallbackComponent={Error}>{children}</ErrorBoundary>
        </main>
      </Container>
    </>
  );
};

export default Page;
