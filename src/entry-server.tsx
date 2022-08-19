import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App, { AppContext } from "./client/App.js";

export function render(url: string, context: AppContext) {
  return ReactDOMServer.renderToString(
    <StaticRouter location={url}>
      <App context={context} />
    </StaticRouter>
  );
}
