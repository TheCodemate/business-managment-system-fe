import { render } from "@testing-library/react";
import { MobileMenuContextProvider } from "../context";
import { MobileMenuNav } from "./mobile_menu_nav";

export const renderMobileMenuNav = () => {
  render(
    <MobileMenuContextProvider>
      <MobileMenuNav />
    </MobileMenuContextProvider>
  );
};
