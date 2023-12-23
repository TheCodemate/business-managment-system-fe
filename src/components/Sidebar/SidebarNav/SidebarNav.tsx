import { ReactElement } from "react";
type Props = {
  children: ReactElement | ReactElement[];
  basis?: string;
};

export const SidebarNav = ({ children, basis }: Props) => {
  console.log(`basis-${basis}`);
  return (
    <nav className={`flex flex-col justify-start basis-${basis} gap-4`}>
      {children}
    </nav>
  );
};
