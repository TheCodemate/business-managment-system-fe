import { ReactNode } from "react";

type ShoppingCartHeaderProps = {
  children: ReactNode;
};

export const Header = ({ children }: ShoppingCartHeaderProps) => {
  return (
    <header>
      <h2 className="text-3xl font-bold">{children}</h2>
    </header>
  );
};
