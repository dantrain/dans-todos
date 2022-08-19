import { useContext } from "react";
import { Context } from "../../App";

const NotFound = () => {
  const context = useContext(Context);
  context.statusCode = 404;

  return <div>Not found</div>;
};

export default NotFound;
