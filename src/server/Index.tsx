import { appleDeviceSpecsForLaunchImages } from "pwa-asset-generator";
import { Fragment } from "react";
import serialize from "serialize-javascript";
import type { AppContext } from "../client/App";

const CLIENT_ID = process.env.VITE_CLIENT_ID;
const isProd = process.env.NODE_ENV === "production";

type IndexProps = {
  content: string;
  manifest?: any;
  context: AppContext;
};

const Index = ({ content, manifest, context }: IndexProps) => {
  const contextJs = `window.__CONTEXT__ = ${serialize(context, {
    isJSON: true,
  })}`;

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
        <meta name="google-signin-client_id" content={CLIENT_ID} />
        <meta name="theme-color" content="#115293" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com/"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=block"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-icon-180.png"
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
        {isProd && <link rel="manifest" href="/manifest.webmanifest" />}
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#1976d2" />
        {appleDeviceSpecsForLaunchImages.map((spec, i) => {
          return (
            <Fragment key={i}>
              <link
                key={`apple-splash-${spec.portrait.width}-${spec.portrait.height}`}
                rel="apple-touch-startup-image"
                href={`apple-splash-${spec.portrait.width}-${spec.portrait.height}.png`}
                media={`(device-width: ${
                  spec.portrait.width / spec.scaleFactor
                }px) and (device-height: ${
                  spec.portrait.height / spec.scaleFactor
                }px) and (-webkit-device-pixel-ratio: ${
                  spec.scaleFactor
                }) and (orientation: portrait)`}
              />
              <link
                key={`apple-splash-${spec.portrait.width}-${spec.portrait.height}`}
                rel="apple-touch-startup-image"
                href={`apple-splash-${spec.portrait.width}-${spec.portrait.height}.png`}
                media={`(device-width: ${
                  spec.portrait.height / spec.scaleFactor
                }px) and (device-height: ${
                  spec.portrait.width / spec.scaleFactor
                }px) and (-webkit-device-pixel-ratio: ${
                  spec.scaleFactor
                }) and (orientation: landscape)`}
              />
            </Fragment>
          );
        })}
        {isProd && <script src="/registerSW.js" />}{" "}
        <title>{context.title}</title>{" "}
        <script
          dangerouslySetInnerHTML={{
            __html: `function onGoogleLibraryLoad() { window.__GOOGLE_LOADED__ = true; }`,
          }}
        />{" "}
        <script src="https://accounts.google.com/gsi/client" async defer />{" "}
      </head>{" "}
      <body>
        {" "}
        <div id="root" dangerouslySetInnerHTML={{ __html: content }} />{" "}
        <script
          type="module"
          src={
            manifest?.["src/entry-client.tsx"]?.file ?? "/src/entry-client.tsx"
          }
        />
        <script dangerouslySetInnerHTML={{ __html: contextJs }} />
      </body>
    </html>
  );
};

export default Index;
