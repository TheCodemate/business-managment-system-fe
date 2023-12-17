import { ReactElement } from "react";
type Props = {
  children: ReactElement | ReactElement[];
  grow?: string;
};

export const SidebarNav = ({ children, grow }: Props) => {
  return (
    <nav className={`flex flex-col justify-start grow-[${grow}]`}>
      <ul className="flex flex-col gap-2">{children}</ul>
    </nav>
  );
};
