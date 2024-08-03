import userEvent from "@testing-library/user-event";
import * as ModalTestUtils from "./modal.test-utils";

const user = userEvent.setup();

describe("SearchRequestForm", () => {
  it("renders itself", () => {
    ModalTestUtils.renderModal({ isOpen: true });
    ModalTestUtils.expectModalToBeInTheDocument();
  });

  it("not renders if not open", () => {
    ModalTestUtils.renderModal({ isOpen: false });
    ModalTestUtils.expectModalNotToBeInTheDocument();
  });
  it("closes when toggle button is clicked", async () => {
    const { toggleModal } = ModalTestUtils.renderModal({ isOpen: true });

    const modal = ModalTestUtils.getModal();
    if (modal) await user.click(modal);
    ModalTestUtils.expectCallbackFunctionToBeCalledWhenModalIsClicked(
      toggleModal
    );
  });
});
