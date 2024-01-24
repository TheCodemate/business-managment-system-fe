import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const OutletSection = ({ children }: Props) => {
  return (
    <div className="flex-1 flex flex-col p-12 justify-center items-center">
      {children}
    </div>
  );
};
