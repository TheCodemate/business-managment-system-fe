import { ReactElement } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryProvider } from "./query_provider";

type Props = {
  children: ReactElement | ReactElement[];
};

export const GlobalProvider = ({ children }: Props) => {
  return (
    <QueryProvider>
      <ReactQueryDevtools initialIsOpen={true} />
      <>{children}</>
    </QueryProvider>
  );
};
