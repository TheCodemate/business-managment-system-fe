import { ReactElement } from "react";
import { useSidebarContext } from "../context";

type SidebarMenuItemProps = {
  text: string;
  icon: ReactElement;
};

export const SidebarMenuItem = ({ icon, text }: SidebarMenuItemProps) => {
  const { isExpanded } = useSidebarContext();
  return (
    <li
      className={`flex ${
        isExpanded ? "flex-[1]" : ""
      } ${"justify-start"} cursor-pointer min-w-max`}
    >
      {icon}
      <p
        className={`flex justify-center items-center text-primary align-middle ${
          isExpanded ? "opacity-100" : "opacity-0"
        } transition-opacity duration-75 pl-4`}
      >
        {text}
      </p>
    </li>
  );
};
