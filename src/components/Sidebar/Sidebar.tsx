import { ReactElement, useState } from "react";
import { SidebarContext } from "./context";

import { Logo } from "../Logo/Logo";
import { ExpandArrow } from "../ExpandArrow/ExpandArrow";
import { SidebarNavLink } from "./SidebarMenuItem/SidebarMenuItem";
import { SidebarNav } from "./SidebarNav/SidebarNav";

type Props = {
  children: ReactElement | ReactElement[];
};

export const Sidebar = ({ children }: Props) => {
  const [isExpanded, setIsExpanded] = useState(true);
  return (
    <SidebarContext.Provider value={{ isExpanded }}>
      <aside
<<<<<<< HEAD
        className={`flex flex-col rounded-tr-lg rounded-br-lg drop-shadow-xl transition-all bg-bgPrimary sm:flex-col sm:top-0 sm:left-0 sm:w-screen m:h-screen m:p-4 ${
          isExpanded ? "max-w-[240px]" : "max-w-[80px]"
        } `}
=======
        className={`hidden items-stretch bg-bgPrimary top-0 left-0 h-screen py-4 rounded-tr-lg rounded-br-lg drop-shadow-xl transition-all ${
          isExpanded ? "max-w-[320px]" : "max-w-[80px]"
        } sm:flex sm:flex-col`}
>>>>>>> main
      >
        <div className={`flex basis-2/12 justify-center`}>
          <Logo />
          <ExpandArrow
            left={isExpanded}
            onClick={() => setIsExpanded((prev) => !prev)}
          />
        </div>
        {children}
      </aside>
    </SidebarContext.Provider>
  );
};

Sidebar.NavLink = SidebarNavLink;
Sidebar.Nav = SidebarNav;
export default Sidebar;
