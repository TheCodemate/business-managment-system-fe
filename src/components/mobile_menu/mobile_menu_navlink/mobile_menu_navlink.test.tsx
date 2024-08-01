import * as MobileMenuNavlinkUtils from "./mobile_menu_navlink.test-utils";

describe("MobileMenuNavlink", () => {
  it("renders itself when props provided", () => {
    MobileMenuNavlinkUtils.renderMobileMenuNavlink();
  });

  it("navlink is in the document", () => {
    MobileMenuNavlinkUtils.renderMobileMenuNavlink();
    MobileMenuNavlinkUtils.expectLinkToBeInTheDocument();
  });
  it("navlink text is displayed", () => {
    MobileMenuNavlinkUtils.renderMobileMenuNavlink();
    MobileMenuNavlinkUtils.expectLinkToBeInTheDocument();
    MobileMenuNavlinkUtils.expectNavlinkTextToBeInTheDocument();
    MobileMenuNavlinkUtils.expectNavlinkToHaveTextContentProvidedInProps();
  });
});
