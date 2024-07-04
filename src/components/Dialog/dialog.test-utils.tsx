import { render, screen } from "@testing-library/react";
import { Dialog, Props } from "./dialog";
import userEvent from "@testing-library/user-event";

export const mockedAcceptHandler = vi.fn();
export const mockedRejectHandler = vi.fn();
export const user = userEvent.setup();

export const renderDialog = (props: Props) => {
  return render(<Dialog {...props} />);
};

export const getDialogContainer = () => {
  return screen.getByTestId("dialog-container");
};

export const getLoader = () => {
  return screen.getByTestId("loader");
};

export const expectDialogContainerToBeInTheDocument = () => {
  expect(getDialogContainer()).toBeInTheDocument();
};
export const expectDialogContainerNotToBeInTheDocument = () => {
  expect(getDialogContainer()).not.toBeInTheDocument();
};

export const getAcceptButton = () => {
  return screen.getByRole("button", { name: new RegExp("wyślij", "i") });
};
export const getRejectButton = () => {
  return screen.getByRole("button", { name: new RegExp("cofnij", "i") });
};

export const clickRejectButton = async () => {
  await user.click(getRejectButton());
};

export const getDialogHeader = () => {
  return screen.getByRole("heading");
};
export const getDialogContent = () => {
  return screen.getByRole("paragraph");
};

export const expectDialogHeaderToBeVisible = () => {
  expect(getDialogHeader()).toBeVisible();
};

export const expectAcceptButtonToBeVisible = () => {
  expect(getAcceptButton()).toBeVisible();
};
export const expectRejectButtonToBeVisible = () => {
  expect(getRejectButton()).toBeVisible();
};

export const expectLoaderToBeVisible = () => {
  expect(getLoader()).toBeVisible();
};

export const expectAcceptButtonToBeDisabled = () => {
  expect(getAcceptButton()).toBeDisabled();
};

export const clickAcceptButton = async () => {
  await user.click(getAcceptButton());
};

export const expectAcceptHandlerNotToBeClicked = () => {
  clickAcceptButton();
  expect(mockedAcceptHandler).not.toBeCalled();
};

export const expectLoadingIconToInTheDocument = () => {
  expect(screen.getByRole("progressbar")).toBeInTheDocument();
};

export const expectDialogContentToBeVisible = () => {
  expect(getDialogContent()).toBeVisible();
};
