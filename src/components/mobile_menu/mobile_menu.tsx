import { ReactElement } from "react";

import { MobileMenuNav } from "./mobile_menu_nav/mobile_menu_nav";
import { MobileMenuNavLink } from "./mobile_menu_navlink/mobile_menu_navlink";
import { Logo } from "../logo/logo";

import { MobileMenuContextProvider } from "./context";
import { HamburgerMenuButton } from "./hamburger_menu_button/hamburger_menu_button";

type Props = {
  children?: ReactElement | ReactElement[];
};

export const MobileMenu = ({ children }: Props) => {
  return (
    <MobileMenuContextProvider>
      <aside
        className={`flex relative flex-col items-center top-0 left-0 bg-bgPrimary py-4  drop-shadow-xl w-screen sm:hidden transition-all`}
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
