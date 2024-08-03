import { render, screen } from "@testing-library/react";
import { Modal } from "./modal";

export const renderModal = ({ isOpen }: { isOpen: boolean }) => {
  const toggleModal = vi.fn();
  render(<Modal isOpen={isOpen} toggleModal={toggleModal} />);

  return { toggleModal };
};

export const getModal = () => {
  return screen.queryByRole("button");
};

export const expectModalToBeInTheDocument = () => {
  expect(getModal()).toBeInTheDocument();
};

export const expectModalNotToBeInTheDocument = () => {
  expect(getModal()).not.toBeInTheDocument();
};

type CallbackType = () => void;

export const expectCallbackFunctionToBeCalledWhenModalIsClicked = (
  callback: CallbackType
) => {
  expect(callback).toHaveBeenCalledOnce();
};
