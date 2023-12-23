import { ReactElement } from "react";
import { useMobileMenuContext } from "../context";
type Props = {
  children: ReactElement | ReactElement[];
  grow?: string;
};

export const MobileMenuNav = ({ children }: Props) => {
  const { isExpanded } = useMobileMenuContext();

  return (
    <nav
      className={`flex flex-col justify-between items-center transition-all overflow-hidden w-full ${
        isExpanded ? "h-[250px]" : "h-0"
      } `}
    >
      {children}
    </nav>
  );
};
