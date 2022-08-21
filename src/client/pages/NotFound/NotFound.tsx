import { Alert, AlertTitle } from "@mui/material";
import { useContext } from "react";
import { Context } from "../../App";
import Page from "../../components/Page";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const NotFound = () => {
  const context = useContext(Context);
  context.statusCode = 404;

  useDocumentTitle("404");

  return (
    <Page>
      <Alert severity="error">
        <AlertTitle>404&apos;d!!</AlertTitle>
        Were you just making up names of files or what? I mean, I&apos;ve seen
        some pretend file names in my day, but come on! It&apos;s like
        you&apos;re not even trying.
      </Alert>
    </Page>
  );
};

export default NotFound;
