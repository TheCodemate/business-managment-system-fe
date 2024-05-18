import { MouseEvent, ReactElement } from "react";
import { createPortal } from "react-dom";

type Props = {
  children: ReactElement;
  isOpen: boolean;
  toggleModal: (e: MouseEvent<HTMLDivElement>) => void;
};

export const Modal = ({ children, isOpen, toggleModal }: Props) => {
  if (!isOpen) {
    return null;
  }

  const handleToggler = (e: MouseEvent<HTMLDivElement>) => {
    toggleModal(e);
  };

  return createPortal(
    <div
      className="fixed top-0 left-0 bg-opacity-90 bg-textPrimary w-full h-full overflow-y-auto flex justify-center items-center"
      onClick={(event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        handleToggler(event);
      }}
    >
      {children}
    </div>,
    document.body
  );
};
