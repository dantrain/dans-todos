import ReactDOMServer from "react-dom/server";
import App, { AppContext } from "./client/App.js";

export function render(context: AppContext) {
  return ReactDOMServer.renderToString(<App context={context} />);
}
