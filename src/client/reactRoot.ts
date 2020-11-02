import { unstable_createRoot as createRoot } from 'react-dom';

const rootElement: HTMLElement | null = document.getElementById('root');

if (!rootElement) {
  throw new Error("Can't find #root element");
}

export default createRoot(rootElement, { hydrate: true });
