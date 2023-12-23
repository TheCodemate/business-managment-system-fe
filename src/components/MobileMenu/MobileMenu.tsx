import { ReactElement } from "react";

import { MobileMenuNav } from "./MobileMenuNav/MobileMenuNav";
import { MobileMenuNavLink } from "./MobileMenuNavLink/MobileMenuNavLink";
import { Logo } from "../Logo/Logo";

import { MobileMenuContextProvider } from "./context";
import { HamburgerMenuButton } from "./HamburgerMenuButton/HamburgerMenuButton";

type Props = {
  children?: ReactElement | ReactElement[];
};

export const MobileMenu = ({ children }: Props) => {
  return (
    <MobileMenuContextProvider>
      <aside
        className={`flex flex-col items-center absolute top-0 left-0 bg-bgPrimary py-4  w-screen sm:hidden transition-all`}
      >
        <div className="flex justify-between items-center w-screen px-12">
          <HamburgerMenuButton />
          <Logo />
        </div>
        {children}
      </aside>
    </MobileMenuContextProvider>
  );
};

MobileMenu.Nav = MobileMenuNav;
MobileMenu.NavLink = MobileMenuNavLink;
