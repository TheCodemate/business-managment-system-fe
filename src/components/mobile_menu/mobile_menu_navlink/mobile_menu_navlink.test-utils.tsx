import { render, screen } from "@testing-library/react";
import { MobileMenuNavLink, Props } from "./mobile_menu_navlink";
import { MobileMenuContextProvider } from "../context";
import { MemoryRouter } from "react-router-dom";

const props: Props = {
  to: "customers",
  text: "Test",
};

export const renderMobileMenuNavlink = () => {
  render(
    <MemoryRouter>
      <MobileMenuContextProvider>
        <MobileMenuNavLink {...props} />
      </MobileMenuContextProvider>
    </MemoryRouter>
  );
};

export const getNavlink = () => {
  return screen.getByRole("link");
};

export const getParagraph = () => {
  return screen.getByRole("paragraph");
};

export const expectLinkToBeInTheDocument = () => {
  expect(getNavlink()).toBeInTheDocument();
};

export const expectNavlinkTextToBeInTheDocument = () => {
  expect(getParagraph()).toBeInTheDocument();
};
export const expectNavlinkToHaveTextContentProvidedInProps = () => {
  expect(getParagraph()).toHaveTextContent(props.text);
};
