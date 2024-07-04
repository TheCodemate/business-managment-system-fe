import { render, screen } from "@testing-library/react";
import { ErrorDisplay } from "./error_display";

const renderErrorDisplay = (error?: Error | null) => {
  render(<ErrorDisplay error={error} />);
};

const getErrorDisplayContainer = () => {
  return screen.queryByRole("alert");
};

const expectErrorDisplayToBeVisible = () => {
  expect(getErrorDisplayContainer()).toBeVisible();
};
const expectErrorDisplayNotToBeInTheDocument = () => {
  expect(getErrorDisplayContainer()).not.toBeInTheDocument();
};

describe("ErrorDisplay", () => {
  it("should render itself", () => {
    renderErrorDisplay();
  });

  it("should be visible if error message prop received", () => {
    renderErrorDisplay(new Error(""));
    expectErrorDisplayToBeVisible();
  });

  it("should not be in the document if error message prop not received", () => {
    renderErrorDisplay();
    expectErrorDisplayNotToBeInTheDocument();
  });
});
