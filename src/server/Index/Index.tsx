import React from "react";
import { AppContext } from "../../client/app/App";
import serialize from "serialize-javascript";

const CLIENT_ID = process.env.RAZZLE_CLIENT_ID;
const isProduction = process.env.NODE_ENV === "production";

let assets: any = require(process.env.RAZZLE_ASSETS_MANIFEST!);

type IndexProps = {
  css: string;
  content: string;
  context: AppContext;
};

const Index = ({ css, content, context }: IndexProps) => {
  const contextJs = `window.__CONTEXT__ = ${serialize(context, {
    isJSON: true,
  })}`;

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {!context.supportsGoogleOneTap && (
          <meta name="google-signin-client_id" content={CLIENT_ID} />
        )}
        <meta name="theme-color" content="#115293" />
        <title>Dan's Todos</title>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com/"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=block"
        />
        <style id="jss-server-side" dangerouslySetInnerHTML={{ __html: css }} />
        {assets?.client?.css && (
          <link rel="stylesheet" href={assets.client.css} />
        )}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#1976d2" />
        <script
          src={assets.client.js}
          defer
          crossOrigin={isProduction ? undefined : "anonymous"}
        />
        {context.supportsGoogleOneTap && (
          <>
            <script
              dangerouslySetInnerHTML={{
                __html: `function onGoogleLibraryLoad() { window.__GOOGLE_LOADED__ = true; }`,
              }}
            />
            <script src="https://accounts.google.com/gsi/client" async defer />
          </>
        )}
        {!context.supportsGoogleOneTap && (
          <>
            <script
              dangerouslySetInnerHTML={{
                __html: `function onGoogleLibraryLoad() {
                    window.__GOOGLE_LOADED__ = true;
                    window.gapi.load('auth2', function() {
                      window.gapi.auth2.init();
                    })
                  }`,
              }}
            />
            <script
              src="https://apis.google.com/js/platform.js?onload=onGoogleLibraryLoad"
              async
              defer
            />
          </>
        )}
      </head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
        <script dangerouslySetInnerHTML={{ __html: contextJs }} />
      </body>
    </html>
  );
};

export default Index;
