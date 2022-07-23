type IndexProps = {
  content: string;
  manifest?: any;
};

const Index = ({ content, manifest }: IndexProps) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, viewport-fit=cover"
      />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
      {manifest?.["src/entry-client.css"]?.file && (
        <link
          rel="stylesheet"
          href={manifest?.["src/entry-client.css"]?.file}
        />
      )}
      <link rel="icon" type="image/svg+xml" href="/vite.svg" />
      <title>Vite + React + TS</title>
    </head>
    <body>
      <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
      <script
        type="module"
        src={
          manifest?.["src/entry-client.tsx"]?.file ?? "/src/entry-client.tsx"
        }
      />
    </body>
  </html>
);

export default Index;
