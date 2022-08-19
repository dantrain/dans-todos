import { useContext, useLayoutEffect } from "react";
import { Context } from "../App";

const useClientEffect =
  typeof document !== "undefined" ? useLayoutEffect : () => {};

const useDocumentTitle = (pageTitle: string) => {
  const context = useContext(Context);
  const title = `${pageTitle ? `${pageTitle} · ` : ""}Dan's Todos`;
  context.title = title;

  useClientEffect(() => {
    document.title = title;
  }, [title]);
};

export default useDocumentTitle;
