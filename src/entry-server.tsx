import ReactDOMServer from "react-dom/server";
import App from "./client/App.js";

export function render() {
  return ReactDOMServer.renderToString(<App />);
}
