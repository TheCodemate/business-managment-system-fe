import * as DialogUtils from "./dialog.test-utils";

const dialogProps = {
  rejectHandler: DialogUtils.mockedRejectHandler,
  acceptButtonText: "Wyślij",
  acceptHandler: DialogUtils.mockedAcceptHandler,
  headerText: "Random header title",
  isLoading: false,
  rejectButtonText: "Cofnij",
  bodyText:
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus, voluptas.",
};

//czy komponent się renderuje
//czy renderuje się button

describe("Dialog", () => {
  it("Render itself", async () => {
    DialogUtils.renderDialog(dialogProps);
    DialogUtils.expectDialogContainerToBeInTheDocument();
  });

  it("renders action buttons if props provided", () => {
    DialogUtils.renderDialog(dialogProps);
    DialogUtils.expectAcceptButtonToBeVisible();
    DialogUtils.expectRejectButtonToBeVisible();
  });

  it("disable button and show loading icon when isLoading true", () => {
    DialogUtils.renderDialog({
      ...dialogProps,
      isLoading: true,
    });
    DialogUtils.expectAcceptButtonToBeDisabled();
    DialogUtils.expectLoadingIconToInTheDocument();
    DialogUtils.expectAcceptHandlerNotToBeClicked();
  });

  it("shows dialog header", () => {
    DialogUtils.renderDialog(dialogProps);
    DialogUtils.expectDialogHeaderToBeVisible();
  });
  it("shows dialog body content", () => {
    DialogUtils.renderDialog(dialogProps);
    DialogUtils.expectDialogContentToBeVisible();
  });

  it("accept handler is fired when accept button is clicked", async () => {
    DialogUtils.renderDialog(dialogProps);
    await DialogUtils.clickAcceptButton();
    expect(dialogProps.acceptHandler).toHaveBeenCalled();
  });
  it("reject handler is fired when reject button is clicked", async () => {
    DialogUtils.renderDialog(dialogProps);
    await DialogUtils.clickRejectButton();
    expect(dialogProps.acceptHandler).toHaveBeenCalled();
  });
});
