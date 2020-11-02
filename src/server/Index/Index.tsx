import React from 'react';
import { AppContext } from '../../client/app/App';
import serialize from 'serialize-javascript';

const CLIENT_ID = process.env.RAZZLE_CLIENT_ID;
const isProduction = process.env.NODE_ENV === 'production';

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
        <meta name="apple-mobile-web-app-capable" content="yes" />
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
        <link
          href="/iphone5_splash.png"
          media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/iphone6_splash.png"
          media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/iphoneplus_splash.png"
          media="(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/iphonex_splash.png"
          media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/iphonexr_splash.png"
          media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/iphonexsmax_splash.png"
          media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/ipad_splash.png"
          media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/ipadpro1_splash.png"
          media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/ipadpro3_splash.png"
          media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/ipadpro2_splash.png"
          media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <script
          src={assets.client.js}
          defer
          crossOrigin={isProduction ? undefined : 'anonymous'}
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
