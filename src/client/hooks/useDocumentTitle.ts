import { useContext, useLayoutEffect } from "react";
import { Context } from "../App";

const useClientEffect =
  typeof document !== "undefined" ? useLayoutEffect : () => {};

const useDocumentTitle = (title: string) => {
  const context = useContext(Context);
  context.title = title;

  useClientEffect(() => {
    document.title = title;
  }, [title]);
};

export default useDocumentTitle;
