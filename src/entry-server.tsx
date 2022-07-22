import ReactDOMServer from "react-dom/server";
import App from "./client/App";

export function render() {
  return ReactDOMServer.renderToString(<App />);
}
