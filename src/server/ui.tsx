import express from "express";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer as createViteServer } from "vite";
import Index from "./Index.js";

const uiRouter = express.Router();

// Create Vite server in middleware mode and configure the app type as
// 'custom', disabling Vite's own HTML serving logic so parent server
// can take control
const vite = await createViteServer({
  server: { middlewareMode: true },
  appType: "custom",
});

// use vite's connect instance as middleware
// if you use your own express router (express.Router()), you should use router.use
uiRouter.use(vite.middlewares);

uiRouter.get("/*", async (req, res, next) => {
  const url = req.originalUrl;

  try {
    //    Load the server entry. vite.ssrLoadModule automatically transforms
    //    your ESM source code to be usable in Node.js! There is no bundling
    //    required, and provides efficient invalidation similar to HMR.
    const { render } = await vite.ssrLoadModule("./src/entry-server.tsx");

    //    render the app HTML. This assumes entry-server.js's exported `render`
    //    function calls appropriate framework SSR APIs,
    //    e.g. ReactDOMServer.renderToString()
    const content = await render(url);

    const template = renderToStaticMarkup(<Index content={content} />);

    //    Apply Vite HTML transforms. This injects the Vite HMR client, and
    //    also applies HTML transforms from Vite plugins, e.g. global preambles
    //    from @vitejs/plugin-react
    const html = await vite.transformIndexHtml(url, template);

    //    Send the rendered HTML back.
    res
      .status(200)
      .set({ "Content-Type": "text/html" })
      .send(`<!DOCTYPE html>\n${html}`);
  } catch (e) {
    // If an error is caught, let Vite fix the stack trace so it maps back to
    // your actual source code.
    if (e instanceof Error) {
      vite.ssrFixStacktrace(e);
    }

    next(e);
  }
});

export default uiRouter;
