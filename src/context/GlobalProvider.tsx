import { ReactElement } from "react";
import { QueryProvider } from "./QueryProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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
