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
      className={`absolute flex top-[80px] flex-col justify-between items-center transition-all w-full bg-bgPrimary ${
        isExpanded ? "h-[250px]" : "h-0"
      } `}
    >
      {children}
    </nav>
  );
};
