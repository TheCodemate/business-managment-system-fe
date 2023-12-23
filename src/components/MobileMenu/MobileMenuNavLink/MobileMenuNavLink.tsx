import { NavLink } from "react-router-dom";
import { useMobileMenuContext } from "../context";

type Props = {
  to: "dashboard" | "customers-list" | "settings";
  text: string;
};

export const MobileMenuNavLink = ({ to, text }: Props) => {
  const { isExpanded } = useMobileMenuContext();

  return (
    <NavLink
      to={to}
      className={`flex flex-[1] items-center text-primary text-4xl duration-0 pl-5`}
    >
      <p
        className={`flex text-primary font-bold items-center min-w-max transition-all ${
          isExpanded ? "opacity-100" : "opacity-0"
        } `}
      >
        {text}
      </p>
    </NavLink>
  );
};
