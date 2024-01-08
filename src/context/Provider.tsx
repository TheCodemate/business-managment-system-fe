import React, { ReactElement } from "react";
import { QueryProvider } from "./QueryProvider";
import { AuthProvider } from "./AuthProvider";

type Props = {
  children: ReactElement | ReactElement[];
};

export const Provider = ({ children }: Props) => {
  return (
    <QueryProvider>
      <AuthProvider>{children}</AuthProvider>
    </QueryProvider>
  );
};
