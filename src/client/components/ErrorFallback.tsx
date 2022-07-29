import { FallbackProps } from "react-error-boundary";

const ErrorFallback = ({ error }: FallbackProps) => {
  return <pre>{error.message}</pre>;
};

export default ErrorFallback;
