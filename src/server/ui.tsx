import express, { ErrorRequestHandler } from "express";
import fs from "fs";
import path from "path";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer as createViteServer, ViteDevServer } from "vite";
import type { AppContext } from "../client/App.js";
import ErrorPage from "../client/components/Error.js";
import Index from "./Index.js";
import logger from "./logger.js";

const isProd = process.env.NODE_ENV === "production";

let manifest: any;

if (isProd) {
  manifest = JSON.parse(
    fs.readFileSync(path.resolve("dist/client/manifest.json"), "utf-8")
  );
}

const uiRouter = express.Router();

let vite: ViteDevServer;

if (!isProd) {
  // Create Vite server in middleware mode and configure the app type as
  // 'custom', disabling Vite's own HTML serving logic so parent server
  // can take control
  vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "custom",
  });

  // use vite's connect instance as middleware
  // if you use your own express router (express.Router()), you should use router.use
  uiRouter.use(vite.middlewares);
}

uiRouter.get("/*", async (req, res, next) => {
  const url = req.originalUrl;
  const context: AppContext = {};

  if (req.session?.userid) {
    context.signedIn = true;
    context.name = req.session.name;
    context.avatar = req.session.avatar;
  } else if (req.path !== "/signin") {
    return res.redirect("/signin");
  }

  try {
    let render: (url: string, context: AppContext) => string;

    if (!isProd) {
      //    Load the server entry. vite.ssrLoadModule automatically transforms
      //    your ESM source code to be usable in Node.js! There is no bundling
      //    required, and provides efficient invalidation similar to HMR.
      render = (await vite.ssrLoadModule("./src/entry-server.tsx")).render;
    } else {
      // @ts-ignore
      render = (await import("../entry-server.tsx")).render;
    }

    //    render the app HTML. This assumes entry-server.js's exported `render`
    //    function calls appropriate framework SSR APIs,
    //    e.g. ReactDOMServer.renderToString()
    const content = await render(url, context);

    let markup = renderToStaticMarkup(
      <Index content={content} manifest={manifest} context={context} />
    );

    if (!isProd) {
      //    Apply Vite HTML transforms. This injects the Vite HMR client, and
      //    also applies HTML transforms from Vite plugins, e.g. global preambles
      //    from @vitejs/plugin-react
      markup = await vite.transformIndexHtml(url, markup);
    }

    //    Send the rendered HTML back.
    res
      .status(context.statusCode || 200)
      .set({ "Content-Type": "text/html" })
      .send(`<!DOCTYPE html>\n${markup}`);
  } catch (e) {
    // If an error is caught, let Vite fix the stack trace so it maps back to
    // your actual source code.
    if (!isProd && e instanceof Error) {
      vite.ssrFixStacktrace(e);
    }

    next(e);
  }
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
uiRouter.use(((err, _req, res, _next) => {
  logger.error(err.stack);

  const content = renderToStaticMarkup(<ErrorPage error={err} />);

  const markup = renderToStaticMarkup(
    <Index
      content={content}
      manifest={manifest}
      context={{ title: "Something broke!", statusCode: 500 }}
    />
  );

  res
    .status(500)
    .set({ "Content-Type": "text/html" })
    .send(`<!DOCTYPE html>\n${markup}`);
}) as ErrorRequestHandler);

export default uiRouter;
